import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import DateTime from '@/nex/types/datetime';
import UInt32 from '@/nex/types/uint32';
import RVMap from '@/nex/types/map';
import RVString from '@/nex/types/string';
import Variant from '@/nex/types/variant';
import PlayLogEntry from '@/nex/protocols/datastore/splatoon-2/types/play-log-entry';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'PlayLogPreparePostParam';

export default class PlayLogPreparePostParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private entries = new List(new PlayLogEntry());
	private playTime = new DateTime();
	private stageID = new UInt32();
	private unknown = new UInt32();
	private properties = new RVMap(new RVString(), new Variant());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.entries.extractFrom(stream);
		this.playTime.extractFrom(stream);
		this.stageID.extractFrom(stream);
		this.unknown.extractFrom(stream);
		this.properties.extractFrom(stream);
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

		json.__fields.entries = this.entries;
		json.__fields.playTime = this.playTime;
		json.__fields.stageID = this.stageID;
		json.__fields.unknown = this.unknown;
		json.__fields.properties = this.properties;

		return json;
	}
}
