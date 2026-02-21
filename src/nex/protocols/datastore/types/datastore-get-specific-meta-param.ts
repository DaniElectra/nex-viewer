import Structure from '@/nex/types/structure';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreGetSpecificMetaParam extends Structure {
	public readonly typeName = 'DataStoreGetSpecificMetaParam';

	private dataIDs = new List(new UInt64());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataIDs.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {}
		};

		json.__fields.dataIDs = this.dataIDs;

		return json;
	}
}
