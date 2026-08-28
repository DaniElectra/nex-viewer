import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import UInt8 from '@/nex/types/uint8';
import Bool from '@/nex/types/bool';
import UnknownStruct1 from '@/nex/protocols/datastore/super-mario-maker-2/types/unknown-struct-1';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SyncUserProfileResult';

export default class SyncUserProfileResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private userID = new PID();
	private username = new RVString();
	private unknown1 = new UnknownStruct1();
	private unknown2 = new QBuffer();
	private unknown3 = new UInt8();
	private countryCode = new RVString();
	private unknown4 = new UInt8();
	private unknown5 = new Bool();
	private unknown6 = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.userID.extractFrom(stream);
		this.username.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.countryCode.extractFrom(stream);
		this.unknown4.extractFrom(stream);
		this.unknown5.extractFrom(stream);
		this.unknown6.extractFrom(stream);
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

		json.__fields.userID = this.userID;
		json.__fields.username = this.username;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.unknown3 = this.unknown3;
		json.__fields.countryCode = this.countryCode;
		json.__fields.unknown4 = this.unknown4;
		json.__fields.unknown5 = this.unknown5;
		json.__fields.unknown6 = this.unknown6;

		return json;
	}
}
