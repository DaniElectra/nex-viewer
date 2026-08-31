import DDLClass from '@/nex/types/ddl-class';
import LeaguePointInfo from '@/nex/protocols/ranking/splatoon-2/types/league-point-info';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'LeagueResult';

export default class LeagueResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private leaguePointInfo = new LeaguePointInfo();
	private status = new UInt8();
	private specificRank = new UInt32();
	private rankRatio = new UInt8();
	private tagNum = new UInt32();
	private matchCount = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.leaguePointInfo.extractFrom(stream);
		this.status.extractFrom(stream);
		this.specificRank.extractFrom(stream);
		this.rankRatio.extractFrom(stream);
		this.tagNum.extractFrom(stream);
		this.matchCount.extractFrom(stream);
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

		json.__fields.leaguePointInfo = this.leaguePointInfo;
		json.__fields.status = this.status;
		json.__fields.specificRank = this.specificRank;
		json.__fields.rankRatio = this.rankRatio;
		json.__fields.tagNum = this.tagNum;
		json.__fields.matchCount = this.matchCount;

		return json;
	}
}
