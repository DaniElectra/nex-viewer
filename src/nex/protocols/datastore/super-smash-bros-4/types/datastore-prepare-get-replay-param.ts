import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStorePrepareGetReplayParam';

export default class DataStorePrepareGetReplayParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private replayId = new UInt64();
	private extraData = new List(new RVString());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.replayId.extractFrom(stream);
		this.extraData.extractFrom(stream);
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

		json.__fields.replayId = this.replayId;
		json.__fields.extraData = this.extraData;

		return json;
	}
}
