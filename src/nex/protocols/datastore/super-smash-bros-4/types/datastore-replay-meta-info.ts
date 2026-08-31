import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import DataStoreReplayPlayer from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-replay-player';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreReplayMetaInfo';

export default class DataStoreReplayMetaInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private replayId = new UInt64();
	private size = new UInt32();
	private mode = new UInt8();
	private style = new UInt8();
	private rule = new UInt8();
	private stage = new UInt8();
	private replayType = new UInt8();
	private players = new List(new DataStoreReplayPlayer());
	private winners = new List(new UInt32());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.replayId.extractFrom(stream);
		this.size.extractFrom(stream);
		this.mode.extractFrom(stream);
		this.style.extractFrom(stream);
		this.rule.extractFrom(stream);
		this.stage.extractFrom(stream);
		this.replayType.extractFrom(stream);
		this.players.extractFrom(stream);
		this.winners.extractFrom(stream);
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
		json.__fields.size = this.size;
		json.__fields.mode = this.mode;
		json.__fields.style = this.style;
		json.__fields.rule = this.rule;
		json.__fields.stage = this.stage;
		json.__fields.replayType = this.replayType;
		json.__fields.players = this.players;
		json.__fields.winners = this.winners;

		return json;
	}
}
