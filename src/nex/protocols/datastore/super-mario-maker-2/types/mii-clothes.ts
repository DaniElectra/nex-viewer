import DDLClass from '@/nex/types/ddl-class';
import UInt16 from '@/nex/types/uint16';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MiiClothes';

export default class MiiClothes extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt16();
	private unknown2 = new UInt16();
	private unknown3 = new Bool();

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
