import * as semver from 'compare-versions';
import type ByteStream from '@/byte-stream';
import type { SerializedMessage } from '@/types/serialized-message';

export default class PIAPacket {
	protected stream: ByteStream;

	// * None of this will exist until the packet is parsed
	private version?: string;
	private headerVersion?: number;
	private encrypted?: boolean;
	private connectionID?: number;
	private packetID?: number;
	private sourceTimer?: number;
	private destinationTimer?: number;
	private AESGCMNonce?: Buffer;
	private AESGCMAuthenticationTag?: Buffer;
	private footerSize?: number;
	private destinationVariableID?: number;
	private sourceVariableID?: number;
	private paddingSize?: number;

	constructor(stream: ByteStream) {
		// * Don't immediately parse because we don't know the PIA
		// * version yet. It's likely we will have to collect all
		// * the PIA packets first, then construct the  p2p mesh,
		// * and then loop back over the PIA packets once we've
		// * determined what the version is from the NEX traffic and
		// * then update the UI
		this.stream = stream;
	}

	public parse(version: string): void {
		this.version = version;
		this.stream.seek(0); // * Ensure we're always at the start
		this.parseHeader();
	}

	private parseHeader(): void {
		if (!this.version) {
			return; // * This will never happen, but make TypeScript happy
		}

		this.stream.skip(0x04); // * We already know the magic matches

		if (semver.satisfies(this.version, '<=5.6')) {
			this.encrypted = this.stream.readUInt8() === 2;
			this.connectionID = this.stream.readUInt8();
			this.packetID = this.stream.readUInt16BE();
			this.sourceTimer = this.stream.readUInt16BE();
			this.destinationTimer = this.stream.readUInt16BE();
		} else if (semver.satisfies(this.version, '>=5.7 <=5.10')) {
			this.encrypted = this.stream.readUInt8() === 2;
			this.connectionID = this.stream.readUInt8();
			this.packetID = this.stream.readUInt16BE();
			this.sourceTimer = this.stream.readUInt16BE();
			this.destinationTimer = this.stream.readUInt16BE();
			this.AESGCMNonce = this.stream.readBytes(0x8);
			this.AESGCMAuthenticationTag = this.stream.readBytes(0x10);
		} else if (semver.satisfies(this.version, '>=5.11 <=5.21')) {
			const byte = this.stream.readUInt8();

			this.encrypted = (byte & 0x80) !== 0;
			this.headerVersion = byte & 0x7F;
			this.connectionID = this.stream.readUInt8();
			this.packetID = this.stream.readUInt16BE();
			this.AESGCMNonce = this.stream.readBytes(0x8);
			this.AESGCMAuthenticationTag = this.stream.readBytes(0x10);
		} else if (semver.satisfies(this.version, '>=5.23 <=5.26')) {
			const byte = this.stream.readUInt8();

			this.encrypted = (byte & 0x80) !== 0;
			this.headerVersion = byte & 0x7F;
			this.connectionID = this.stream.readUInt8();
			this.packetID = this.stream.readUInt16BE();
			this.AESGCMNonce = this.stream.readBytes(0x8);
			this.AESGCMAuthenticationTag = this.stream.readBytes(0x8);
		} else if (semver.satisfies(this.version, '>=5.27 <=5.45')) {
			const byte = this.stream.readUInt8();

			this.encrypted = (byte & 0x80) !== 0;
			this.headerVersion = byte & 0x7F;
			this.destinationVariableID = this.stream.readUInt32BE();
			this.sourceVariableID = this.stream.readUInt32BE();
			this.packetID = this.stream.readUInt16BE();
			this.footerSize = this.stream.readUInt8();
			this.AESGCMNonce = this.stream.readBytes(0x8);
			this.AESGCMAuthenticationTag = this.stream.readBytes(0x8);
		} else if (semver.satisfies(this.version, '>=6.16 <=6.30')) {
			const byte = this.stream.readUInt8();

			this.encrypted = (byte & 0x80) !== 0;
			this.headerVersion = byte & 0x7F;
			this.destinationVariableID = this.stream.readUInt16BE();
			this.sourceVariableID = this.stream.readUInt16BE();
			this.packetID = this.stream.readUInt16BE();
			this.footerSize = this.stream.readUInt8();
			this.AESGCMNonce = this.stream.readBytes(0x8);
			this.AESGCMAuthenticationTag = this.stream.readBytes(0x8);
		} else if (semver.satisfies(this.version, '>=6.32 <=6.41')) {
			const byte = this.stream.readUInt8();

			this.encrypted = (byte & 0x80) !== 0;
			this.headerVersion = byte & 0x7F;
			this.paddingSize = this.stream.readUInt8();
			this.destinationVariableID = this.stream.readUInt16BE();
			this.sourceVariableID = this.stream.readUInt16BE();
			this.packetID = this.stream.readUInt16BE();
			this.footerSize = this.stream.readUInt8();
			this.AESGCMNonce = this.stream.readBytes(0x8);
			this.AESGCMAuthenticationTag = this.stream.readBytes(0x8);
		}
	}

	public toJSON(): SerializedMessage {
		return {
			id: -1, // * Gets set later when emitted
			elapsed_time: 0,
			transport: 'PIA',
			source: '',
			destination: '',
			overview_sections: [],
			hex_views: [],
			serialized_tabs: []
		};
	}
}
