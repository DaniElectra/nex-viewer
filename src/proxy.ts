import { getLocal, generateCACertificate, MockttpHttpsOptions, Mockttp } from 'mockttp';
import passThroughHandling from 'mockttp/dist/rules/passthrough-handling';
import serverUtils from 'mockttp/dist/util/server-utils';

import { readFileSync, existsSync, writeFileSync, mkdirSync } from 'fs';
import path from 'path';
import { app, BrowserWindow } from 'electron';
import type { CompletedRequest } from 'mockttp';
import NPLNTransaction from './npln/npln-transaction';

const certDir = path.join(app.getPath('userData'), 'proxy-ca');
const certPath = path.join(certDir, 'cert.pem');
const keyPath = path.join(certDir, 'key.pem');

const gameSyncIpRanges = [
    "136.",
    "34.",
    "35.",
]

const THROTTLE_MS = 200;

const getUpstreamTlsOptions = passThroughHandling.getUpstreamTlsOptions;
passThroughHandling.getUpstreamTlsOptions = function (options) {
    const tlsOptions = getUpstreamTlsOptions(options);
    // Since we're using Electron (which uses BoringSSL under the hood), SECLEVEL is not supported and will cause an error on the OpenSSL compat side if added
    if (tlsOptions.ciphers && tlsOptions.ciphers.includes('@SECLEVEL=0')) {
        tlsOptions.ciphers = tlsOptions.ciphers.replace('@SECLEVEL=0', '');
    }
    return tlsOptions;
}

const originalShouldPassThrough = serverUtils.shouldPassThrough;
serverUtils.shouldPassThrough = function (hostname, passThroughPatterns, interceptOnlyPatterns): hostname is string {
    // GameSync (AKA gamesync.npln.nintendo.net) directly connects to an IP address provided by matchmaking, and the actual hostname is just SNI
    // URLPattern doesn't seem to handle IPs that well, so we have to check this manually
    if (hostname && gameSyncIpRanges.some(range => hostname!.startsWith(range))) {
        return false;
    }
    const shouldPassThrough = originalShouldPassThrough(hostname, passThroughPatterns, interceptOnlyPatterns);

    return shouldPassThrough
}

interface PendingRequest {
    packetId: number;
    req: CompletedRequest;
    responseHeaders: Record<string, string>;
    requestBodyChunks: Buffer[];
    responseBodyChunks: Buffer[];
    decodedResponseFrames: number;
    throttleTimer: ReturnType<typeof setTimeout> | null;
    dirty: boolean;
}

export class Proxy {
    public server: Mockttp;
    public listening = false;
    private pending = new Map<string, PendingRequest>();
    private packetIdCounter = 0;
    private browserWindow: BrowserWindow;

    private constructor(https: MockttpHttpsOptions, browserWindow: BrowserWindow) {
        this.server = getLocal({
            https,
            http2: true
        });
        this.browserWindow = browserWindow;
    }

    public static async create(browserWindow: BrowserWindow): Promise<Proxy> {
        if (!existsSync(certDir)) {
            mkdirSync(certDir);
        }

        let cert: string;
        let key: string;
        if (existsSync(certPath) && existsSync(keyPath)) {
            cert = readFileSync(certPath, 'utf-8');
            key = readFileSync(keyPath, 'utf-8');
        } else {
            const certificate = await generateCACertificate({
                subject: {
                    commonName: 'NEX Viewer Proxy CA',
                    organizationName: 'NEX Viewer',
                    countryName: 'XX',
                },
            })

            cert = certificate.cert;
            key = certificate.key;

            writeFileSync(certPath, cert);
            writeFileSync(keyPath, key);
        }

        return new Proxy({
            cert,
            key,
            tlsInterceptOnly: [
                // Main NPLN tenant
                "*.npln.srv.nintendo.net",
                // Gamesync domain
                "gamesync.npln.nintendo.net"
            ].map((hostname) => ({ hostname }))
        }, browserWindow);
    }

    // To avoid sending too many updates at once for large requests/responses, we throttle updates so that multiple frames can be sent together
    private scheduleThrottledUpdate(p: PendingRequest): void {
        p.dirty = true;
        if (p.throttleTimer) return;
        p.throttleTimer = setTimeout(() => {
            p.throttleTimer = null;
            if (p.dirty) {
                p.dirty = false;
                this.sendPartialUpdate(p);
            }
        }, THROTTLE_MS);
    }

    private sendPartialUpdate(p: PendingRequest): void {
        try {
            const transaction = NPLNTransaction.buildPartial(p.req, p.responseHeaders, p.requestBodyChunks, p.responseBodyChunks, p.decodedResponseFrames);
            if (transaction.newFrameCount > p.decodedResponseFrames) {
                p.decodedResponseFrames = transaction.newFrameCount;
            }
            transaction.npln.id = p.packetId;
            const serialized = transaction.npln.toJSON();
            serialized.status = 'PENDING';
            this.browserWindow.webContents.send('serializedMessageUpdated', p.packetId, JSON.stringify(serialized));
        } catch (e) {

        }
    }

    public async init(): Promise<void> {
        this.server.forAnyRequest().thenPassThrough({
            ignoreHostHttpsErrors: true,
        })

        this.server.on("request", async (req) => {
            if (req.headers["content-type"] && req.headers["content-type"].includes("application/grpc")) {
                const packetId = this.packetIdCounter++;
                this.pending.set(req.id, {
                    packetId,
                    req,
                    responseHeaders: {},
                    requestBodyChunks: [],
                    responseBodyChunks: [],
                    decodedResponseFrames: 0,
                    throttleTimer: null,
                    dirty: false
                });

                const url = new URL(req.url);
                const methodPath = url.pathname;
                const [, fullyQualifiedServiceName, methodName] = methodPath.split('/');
                this.browserWindow.webContents.send('serializedMessage', JSON.stringify({
                    id: packetId,
                    elapsed_time: 0,
                    transport: 'NPLN',
                    source: req.remoteIpAddress || 'unknown',
                    destination: `${url.protocol}//${url.hostname}`,
                    service: fullyQualifiedServiceName,
                    method: methodName,
                    status: 'PENDING',
                    overview_sections: [],
                    hex_views: [],
                    serialized_tabs: []
                }));
            }
        })

        this.server.on("request-body-data", (data) => {
            const p = this.pending.get(data.id);
            if (p) {
                p.requestBodyChunks.push(Buffer.from(data.content));
                this.scheduleThrottledUpdate(p);
            }
        })

        this.server.on("response-body-data", (data) => {
            const p = this.pending.get(data.id);
            if (p) {
                p.responseBodyChunks.push(Buffer.from(data.content));
                this.scheduleThrottledUpdate(p);
            }
        })

        this.server.on("response-initiated", (res) => {
            const p = this.pending.get(res.id);
            if (p) {
                p.responseHeaders = res.headers as Record<string, string>;
                this.scheduleThrottledUpdate(p);
            }
        })

        this.server.on("response", async (res) => {
            const p = this.pending.get(res.id);
            if (p) {
                const timeTaken = (Date.now() - p.req.timingEvents.startTime) / 1000;

                if (p.throttleTimer) {
                    clearTimeout(p.throttleTimer);
                    p.throttleTimer = null;
                }

                try {
                    const transaction = await NPLNTransaction.parseFromMockttpCompleteRequestResponse(p.req, res);
                    transaction.id = p.packetId;
                    const serialized = transaction.toJSON();
                    serialized.status = 'SUCCESS';
                    serialized.elapsed_time = timeTaken
                    this.browserWindow.webContents.send('serializedMessageUpdated', p.packetId, JSON.stringify(serialized));
                } catch (e) {
                    this.browserWindow.webContents.send('serializedMessageUpdated', p.packetId, JSON.stringify({
                        id: p.packetId,
                        elapsed_time: timeTaken,
                        transport: 'NPLN',
                        source: p.req.remoteIpAddress || 'unknown',
                        destination: p.req.url,
                        service: '',
                        method: '',
                        status: 'ERROR',
                        overview_sections: [],
                        hex_views: [],
                        serialized_tabs: [],
                        stack_trace: e instanceof Error ? e.stack : undefined
                    }));
                }

                this.pending.delete(res.id);
            }
        })

        this.server.on("abort", (req) => {
            const p = this.pending.get(req.id);
            if (p) {
                // Aborted can also be emitted when the client closes the connection before a graceful shutdown, so we should still attempt to parse and send the data we have
                const partial = NPLNTransaction.buildPartial(p.req, p.responseHeaders, p.requestBodyChunks, p.responseBodyChunks, p.decodedResponseFrames);
                partial.npln.id = p.packetId;
                const serialized = partial.npln.toJSON();
                serialized.status = 'ABORTED';
                this.browserWindow.webContents.send('serializedMessageUpdated', p.packetId, JSON.stringify(serialized));

                this.pending.delete(req.id);
            }
        })
    }

    public async start(port: number): Promise<void> {
        await this.init();
        await this.server.start(port);
        this.listening = true;
    }

    public async stop(): Promise<void> {
        await this.server.stop();
        this.cleanup();
        this.listening = false;
    }

    public cleanup(): void {
        for (const p of this.pending.values()) {
            if (p.throttleTimer) {
                clearTimeout(p.throttleTimer);
            }
        }
        this.pending.clear();
    }


    public static getCACertPath(): string {
        return certPath;
    }
}