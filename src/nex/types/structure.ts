import type NEXByteStream from '@/nex/byte-stream';

export default class Structure {
	protected _structureVersion?: number;

	get structureVersion(): number {
		return this._structureVersion || 0;
	}

	protected extractHeaderFrom(stream: NEXByteStream): void {
		if (stream.title.settings.use_structure_header) {
			this._structureVersion = stream.readUInt8();
			stream.skip(4); // * Ignore the size
		}
	}
}
