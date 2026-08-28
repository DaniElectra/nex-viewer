import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import UInt64 from '@/nex/types/uint64';
import Int32 from '@/nex/types/int32';
import List from '@/nex/types/list';
import UInt16 from '@/nex/types/uint16';
import RVString from '@/nex/types/string';
import DataStoreReplayPlayer from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-replay-player';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStorePreparePostReplayParam';

export default class DataStorePreparePostReplayParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private size = new UInt32();
	private mode = new UInt8();
	private style = new UInt8();
	private rule = new UInt8();
	private stage = new UInt8();
	private replayType = new UInt8();
	private competitionId = new UInt64();
	private score = new Int32();
	private players = new List(new DataStoreReplayPlayer());
	private winners = new List(new UInt32());
	private keyVersion = new UInt16();
	private extraData = new List(new RVString());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.size.extractFrom(stream);
		this.mode.extractFrom(stream);
		this.style.extractFrom(stream);
		this.rule.extractFrom(stream);
		this.stage.extractFrom(stream);
		this.replayType.extractFrom(stream);
		this.competitionId.extractFrom(stream);
		this.score.extractFrom(stream);
		this.players.extractFrom(stream);
		this.winners.extractFrom(stream);
		this.keyVersion.extractFrom(stream);
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

		json.__fields.size = this.size;
		json.__fields.mode = this.mode;
		json.__fields.style = this.style;
		json.__fields.rule = this.rule;
		json.__fields.stage = this.stage;
		json.__fields.replayType = this.replayType;
		json.__fields.competitionId = this.competitionId;
		json.__fields.score = this.score;
		json.__fields.players = this.players;
		json.__fields.winners = this.winners;
		json.__fields.keyVersion = this.keyVersion;
		json.__fields.extraData = this.extraData;

		return json;
	}
}
