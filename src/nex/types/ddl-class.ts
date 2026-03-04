import type NEXByteStream from '@/nex/byte-stream';

// * See https://nintendo.wiki/wiki/Online/Nintendo_Network/NEX/Types#Classes
export default class DDLClass {
	protected _revision?: number;

	get revision(): number {
		return this._revision || 0;
	}

	protected extractHeaderFrom(stream: NEXByteStream): void {
		if (stream.title.settings.use_structure_header) {
			this._revision = stream.readUInt8();
			stream.skip(4); // * Ignore the size
		}
	}
}
