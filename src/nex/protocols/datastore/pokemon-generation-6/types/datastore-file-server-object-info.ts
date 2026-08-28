import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import DataStoreReqGetInfo from '@/nex/protocols/datastore/types/datastore-req-get-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreFileServerObjectInfo';

export default class DataStoreFileServerObjectInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private getInfo = new DataStoreReqGetInfo();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.getInfo.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.dataId = this.dataId;
		json.__fields.getInfo = this.getInfo;

		return json;
	}
}
