import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemRightBinary';

export default class ServiceItemRightBinary extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private useType = new UInt8();
	private rightBinary = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.useType.extractFrom(stream);
		this.rightBinary.extractFrom(stream);
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

		json.__fields.useType = this.useType;
		json.__fields.rightBinary = this.rightBinary;

		return json;
	}
}
