import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FriendUserInfo';

export default class FriendUserInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private name = new RVString();
	private presence = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.name.extractFrom(stream);
		this.presence.extractFrom(stream);
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

		json.__fields.pid = this.pid;
		json.__fields.name = this.name;
		json.__fields.presence = this.presence;

		return json;
	}
}
