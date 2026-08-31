import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RentalObjectUploadParam';

export default class RentalObjectUploadParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new RVString();
	private unknown2 = new QBuffer();
	private unknown3 = new List(new UInt32());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
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
		json.__fields.unknown3 = this.unknown3;

		return json;
	}
}
