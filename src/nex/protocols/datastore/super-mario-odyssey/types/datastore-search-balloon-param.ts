import DDLClass from '@/nex/types/ddl-class';
import UInt16 from '@/nex/types/uint16';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreSearchBalloonParam';

export default class DataStoreSearchBalloonParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataType = new UInt16();
	private userRank = new UInt8();
	private resultSetCount = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataType.extractFrom(stream);
		this.userRank.extractFrom(stream);
		this.resultSetCount.extractFrom(stream);
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

		json.__fields.dataType = this.dataType;
		json.__fields.userRank = this.userRank;
		json.__fields.resultSetCount = this.resultSetCount;

		return json;
	}
}
