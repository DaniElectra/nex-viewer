import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import DataStoreCompletePostParam from '@/nex/protocols/datastore/types/datastore-complete-post-param';
import DataStorePreparePostSharedDataParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-prepare-post-shared-data-param';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreCompletePostSharedDataParam';

export default class DataStoreCompletePostSharedDataParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private completeParam = new DataStoreCompletePostParam();
	private prepareParam = new DataStorePreparePostSharedDataParam();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.completeParam.extractFrom(stream);
		this.prepareParam.extractFrom(stream);
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
		json.__fields.completeParam = this.completeParam;
		json.__fields.prepareParam = this.prepareParam;

		return json;
	}
}
