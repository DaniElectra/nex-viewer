import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'StartBattleModeParam';

export default class StartBattleModeParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private gid = new UInt32();
	private pids = new List(new PID());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.gid.extractFrom(stream);
		this.pids.extractFrom(stream);
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
		json.__fields.gid = this.gid;
		json.__fields.pids = this.pids;

		return json;
	}
}
