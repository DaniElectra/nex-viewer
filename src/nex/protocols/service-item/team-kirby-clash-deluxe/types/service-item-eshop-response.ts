import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemEShopResponse';

export default class ServiceItemEShopResponse extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private httpStatus = new UInt32();
	private errorCode = new UInt32();
	private correlationId = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.httpStatus.extractFrom(stream);
		this.errorCode.extractFrom(stream);
		this.correlationId.extractFrom(stream);
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

		json.__fields.httpStatus = this.httpStatus;
		json.__fields.errorCode = this.errorCode;
		json.__fields.correlationId = this.correlationId;

		return json;
	}
}
