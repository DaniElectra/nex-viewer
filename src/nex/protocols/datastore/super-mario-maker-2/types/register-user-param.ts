import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import UInt8 from '@/nex/types/uint8';
import UnknownStruct1 from '@/nex/protocols/datastore/super-mario-maker-2/types/unknown-struct-1';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RegisterUserParam';

export default class RegisterUserParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private username = new RVString();
	private unknown1 = new UnknownStruct1();
	private unknown2 = new QBuffer();
	private regionID = new UInt8();
	private countryCode = new RVString();
	private pseudoDeviceID = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.username.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.regionID.extractFrom(stream);
		this.countryCode.extractFrom(stream);
		this.pseudoDeviceID.extractFrom(stream);
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

		json.__fields.username = this.username;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.regionID = this.regionID;
		json.__fields.countryCode = this.countryCode;
		json.__fields.pseudoDeviceID = this.pseudoDeviceID;

		return json;
	}
}
