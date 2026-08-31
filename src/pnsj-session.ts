import { gzipSync, gunzipSync } from 'node:zlib';
import type { SerializedMessage } from '@/types/serialized-message';

export default class PNSJSession {
	private buffer: Buffer;
	private _messages: SerializedMessage[] = [];

	constructor(buffer: Buffer) {
		this.buffer = buffer;

		this.parse();
	}

	private parse(): void {
		const decoded: SerializedMessage[] = JSON.parse(gunzipSync(this.buffer).toString());

		if (!Array.isArray(decoded)) {
			throw new Error('Invalid .pnsj file: Expected an array of messages.');
		}

		for (const item of decoded) {
			if (typeof item !== 'object' || item === null) {
				continue;
			}

			const id = typeof item.id === 'number' ? item.id : Number(item.id || 0);
			const msg: SerializedMessage = {
				id,
				elapsed_time: typeof item.elapsed_time === 'number' ? item.elapsed_time : Number(item.elapsed_time || 0),
				transport: String(item.transport ?? ''),
				source: String(item.source ?? ''),
				destination: String(item.destination ?? ''),
				destination_path: item.destination_path,
				service: item.service,
				method: item.method,
				direction: item.direction,
				status: item.status,
				overview_sections: Array.isArray(item.overview_sections) ? item.overview_sections : [],
				hex_views: Array.isArray(item.hex_views) ? item.hex_views : [],
				serialized_tabs: Array.isArray(item.serialized_tabs) ? item.serialized_tabs : [],
				stack_trace: item.stack_trace
			};

			this._messages.push(msg);
		}
	}

	public static serialize(messages: SerializedMessage[]): Buffer {
		const encoded = gzipSync(JSON.stringify(messages));
		return Buffer.from(encoded);
	}

	public* messages(): Generator<SerializedMessage> {
		for (const message of this._messages) {
			yield message;
		}
	}
}
