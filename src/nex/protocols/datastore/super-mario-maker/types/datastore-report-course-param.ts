import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import RVString from '@/nex/types/string';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreReportCourseParam';

export default class DataStoreReportCourseParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private miiName = new RVString();
	private reportCategory = new UInt8();
	private reportReason = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.miiName.extractFrom(stream);
		this.reportCategory.extractFrom(stream);
		this.reportReason.extractFrom(stream);
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
		json.__fields.miiName = this.miiName;
		json.__fields.reportCategory = this.reportCategory;
		json.__fields.reportReason = this.reportReason;

		return json;
	}
}
