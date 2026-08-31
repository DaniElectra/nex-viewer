import DDLClass from '@/nex/types/ddl-class';
import RVMap from '@/nex/types/map';
import UInt8 from '@/nex/types/uint8';
import UnknownStruct4 from '@/nex/protocols/datastore/super-mario-maker-2/types/unknown-struct-4';
import UnknownStruct5 from '@/nex/protocols/datastore/super-mario-maker-2/types/unknown-struct-5';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'EndlessModeStatus';

export default class EndlessModeStatus extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new RVMap(new UInt8(), new UnknownStruct4());
	private unknown2 = new RVMap(new UInt8(), new UnknownStruct5());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
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
		json.__fields.unknown2 = this.unknown2;

		return json;
	}
}
