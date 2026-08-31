import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'BankTransactionParam';

export default class BankTransactionParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private curVersion = new UInt32();
	private updateVersion = new UInt32();
	private size = new UInt32();
	private transactionPassword = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.curVersion.extractFrom(stream);
		this.updateVersion.extractFrom(stream);
		this.size.extractFrom(stream);
		this.transactionPassword.extractFrom(stream);
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

		json.__fields.dataId = this.dataId;
		json.__fields.curVersion = this.curVersion;
		json.__fields.updateVersion = this.updateVersion;
		json.__fields.size = this.size;
		json.__fields.transactionPassword = this.transactionPassword;

		return json;
	}
}
