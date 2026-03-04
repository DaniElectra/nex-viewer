import DDLClass from '@/nex/types/ddl-class';
import Int32 from '@/nex/types/int32';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreRateObjectParam';

export default class DataStoreRateObjectParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private ratingValue = new Int32();
	private accessPassword = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.ratingValue.extractFrom(stream);
		this.accessPassword.extractFrom(stream);
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

		json.__fields.ratingValue = this.ratingValue;
		json.__fields.accessPassword = this.accessPassword;

		return json;
	}
}
