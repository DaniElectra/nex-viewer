import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ApiCall';

export default class ApiCall extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private methodName = new RVString();
	private callTime = new DateTime();
	private userID = new PID();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.methodName.extractFrom(stream);
		this.callTime.extractFrom(stream);
		this.userID.extractFrom(stream);
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

		json.__fields.methodName = this.methodName;
		json.__fields.callTime = this.callTime;
		json.__fields.userID = this.userID;

		return json;
	}
}
