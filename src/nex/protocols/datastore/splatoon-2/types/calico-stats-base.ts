import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import Int32 from '@/nex/types/int32';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import DateTime from '@/nex/types/datetime';
import UInt64 from '@/nex/types/uint64';
import CalicoPlayerResult from '@/nex/protocols/datastore/splatoon-2/types/calico-player-result';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CalicoStatsBase';

export default class CalicoStatsBase extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private gameMode = new UInt32();
	private rule = new Int32();
	private result = new UInt8();
	private stage = new Int32();
	private playerResult = new CalicoPlayerResult();
	private myTeamMembers = new List(new CalicoPlayerResult());
	private otherTeamMembers = new List(new CalicoPlayerResult());
	private weaponPaintPoint = new Int32();
	private startTime = new DateTime();
	private battleNum = new UInt64();
	private playerRank = new Int32();
	private starRank = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.gameMode.extractFrom(stream);
		this.rule.extractFrom(stream);
		this.result.extractFrom(stream);
		this.stage.extractFrom(stream);
		this.playerResult.extractFrom(stream);
		this.myTeamMembers.extractFrom(stream);
		this.otherTeamMembers.extractFrom(stream);
		this.weaponPaintPoint.extractFrom(stream);
		this.startTime.extractFrom(stream);
		this.battleNum.extractFrom(stream);
		this.playerRank.extractFrom(stream);
		this.starRank.extractFrom(stream);
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

		json.__fields.gameMode = this.gameMode;
		json.__fields.rule = this.rule;
		json.__fields.result = this.result;
		json.__fields.stage = this.stage;
		json.__fields.playerResult = this.playerResult;
		json.__fields.myTeamMembers = this.myTeamMembers;
		json.__fields.otherTeamMembers = this.otherTeamMembers;
		json.__fields.weaponPaintPoint = this.weaponPaintPoint;
		json.__fields.startTime = this.startTime;
		json.__fields.battleNum = this.battleNum;
		json.__fields.playerRank = this.playerRank;
		json.__fields.starRank = this.starRank;

		return json;
	}
}
