import DDLClass from '@/nex/types/ddl-class';
import UniqueIdInfo from '@/nex/protocols/utility/types/unique-id-info';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'UpdateCurrentUserParam';

export default class UpdateCurrentUserParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private info = new UniqueIdInfo();
	private region = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.info.extractFrom(stream);
		this.region.extractFrom(stream);
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

		json.__fields.info = this.info;
		json.__fields.region = this.region;

		return json;
	}
}
