import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import UInt8 from '@/nex/types/uint8';
import RentalObjectInfo from '@/nex/protocols/datastore/xenoblade-chronicles-x/types/rental-object-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RentalObjectSearchResult';

export default class RentalObjectSearchResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt32();
	private results = new List(new RentalObjectInfo());
	private unknown2 = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.results.extractFrom(stream);
		this.unknown2.extractFrom(stream);
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

		json.__fields.unknown1 = this.unknown1;
		json.__fields.results = this.results;
		json.__fields.unknown2 = this.unknown2;

		return json;
	}
}
