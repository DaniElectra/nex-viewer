import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import CompetitionRankingScoreData from '@/nex/protocols/ranking/splatoon/types/competition-ranking-score-data';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CompetitionRankingScoreInfo';

export default class CompetitionRankingScoreInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private festivalID = new UInt32();
	private scoreData = new List(new CompetitionRankingScoreData());
	private unknown = new UInt32();
	private teamWins = new List(new UInt32());
	private teamVotes = new List(new UInt32());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.festivalID.extractFrom(stream);
		this.scoreData.extractFrom(stream);
		this.unknown.extractFrom(stream);
		this.teamWins.extractFrom(stream);
		this.teamVotes.extractFrom(stream);
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

		json.__fields.festivalID = this.festivalID;
		json.__fields.scoreData = this.scoreData;
		json.__fields.unknown = this.unknown;
		json.__fields.teamWins = this.teamWins;
		json.__fields.teamVotes = this.teamVotes;

		return json;
	}
}
