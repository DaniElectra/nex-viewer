import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'UniqueIdInfo';

export default class UniqueIdInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private nexUniqueId = new UInt64();
	private nexUniqueIdPassword = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.nexUniqueId.extractFrom(stream);
		this.nexUniqueIdPassword.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				nexUniqueId: this.nexUniqueId,
				nexUniqueIdPassword: this.nexUniqueIdPassword
			}
		};
	}
}
