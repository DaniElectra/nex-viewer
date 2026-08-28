import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CoconutGetParam';

export default class CoconutGetParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private uniqueIds = new List(new UInt64());
	private getType = new UInt8();
	private region = new UInt8();
	private festivalId = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.uniqueIds.extractFrom(stream);
		this.getType.extractFrom(stream);
		this.region.extractFrom(stream);
		this.festivalId.extractFrom(stream);
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

		json.__fields.uniqueIds = this.uniqueIds;
		json.__fields.getType = this.getType;
		json.__fields.region = this.region;
		json.__fields.festivalId = this.festivalId;

		return json;
	}
}
