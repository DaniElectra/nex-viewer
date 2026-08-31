import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GetUsersParam';

export default class GetUsersParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private userPIDs = new List(new PID());
	private resultOption = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.userPIDs.extractFrom(stream);
		this.resultOption.extractFrom(stream);
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

		json.__fields.userPIDs = this.userPIDs;
		json.__fields.resultOption = this.resultOption;

		return json;
	}
}
