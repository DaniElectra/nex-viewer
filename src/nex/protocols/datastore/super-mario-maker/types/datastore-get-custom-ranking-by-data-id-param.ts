import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreGetCustomRankingByDataIdParam';

export default class DataStoreGetCustomRankingByDataIdParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private applicationId = new UInt32();
	private dataIdList = new List(new UInt64());
	private resultOption = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.applicationId.extractFrom(stream);
		this.dataIdList.extractFrom(stream);
		this.resultOption.extractFrom(stream);
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

		json.__fields.applicationId = this.applicationId;
		json.__fields.dataIdList = this.dataIdList;
		json.__fields.resultOption = this.resultOption;

		return json;
	}
}
