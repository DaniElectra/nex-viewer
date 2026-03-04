import Structure from '@/nex/types/structure';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreGetSpecificMetaParamV1';

export default class DataStoreGetSpecificMetaParamV1 extends Structure {
	public get typeName(): string {
		return className;
	}

	private dataIDs = new List(new UInt32());

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
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.dataIDs = this.dataIDs;

		return json;
	}
}
