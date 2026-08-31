import DDLClass from '@/nex/types/ddl-class';
import Int32 from '@/nex/types/int32';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSFriend';

export default class OLSFriend extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private pid = new Int32();
	private relationship = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.relationship.extractFrom(stream);
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
		json.__fields.relationship = this.relationship;

		return json;
	}
}
