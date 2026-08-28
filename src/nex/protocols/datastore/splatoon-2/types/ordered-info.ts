import DDLClass from '@/nex/types/ddl-class';
import Int32 from '@/nex/types/int32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OrderedInfo';

export default class OrderedInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private gearKind = new Int32();
	private gearId = new Int32();
	private skillId = new Int32();
	private price = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.gearKind.extractFrom(stream);
		this.gearId.extractFrom(stream);
		this.skillId.extractFrom(stream);
		this.price.extractFrom(stream);
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

		json.__fields.gearKind = this.gearKind;
		json.__fields.gearId = this.gearId;
		json.__fields.skillId = this.skillId;
		json.__fields.price = this.price;

		return json;
	}
}
