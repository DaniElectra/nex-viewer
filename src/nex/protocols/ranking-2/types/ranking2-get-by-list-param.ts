import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Ranking2GetByListParam';

export default class Ranking2GetByListParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private category = new UInt32();
	private offset = new UInt32();
	private length = new UInt32();
	private sortFlags = new UInt32();
	private optionFlags = new UInt32();
	private numSeasonsToGoBack = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.category.extractFrom(stream);
		this.offset.extractFrom(stream);
		this.length.extractFrom(stream);
		this.sortFlags.extractFrom(stream);
		this.optionFlags.extractFrom(stream);
		this.numSeasonsToGoBack.extractFrom(stream);
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

		json.__fields.category = this.category;
		json.__fields.offset = this.offset;
		json.__fields.length = this.length;
		json.__fields.sortFlags = this.sortFlags;
		json.__fields.optionFlags = this.optionFlags;
		json.__fields.numSeasonsToGoBack = this.numSeasonsToGoBack;

		return json;
	}
}
