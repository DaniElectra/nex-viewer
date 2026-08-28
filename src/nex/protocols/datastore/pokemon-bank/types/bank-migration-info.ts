import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'BankMigrationInfo';

export default class BankMigrationInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private migrationStatus = new UInt32();
	private updatedTime = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.migrationStatus.extractFrom(stream);
		this.updatedTime.extractFrom(stream);
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

		json.__fields.migrationStatus = this.migrationStatus;
		json.__fields.updatedTime = this.updatedTime;

		return json;
	}
}
