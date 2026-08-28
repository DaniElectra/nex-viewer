import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import Ranking2RankData from '@/nex/protocols/ranking-2/types/ranking2-rank-data';
import UInt32 from '@/nex/types/uint32';
import Int32 from '@/nex/types/int32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Ranking2Info';

export default class Ranking2Info extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private rankDataList = new List(new Ranking2RankData());
	private lowestRank = new UInt32();
	private numRankedIn = new UInt32();
	private season = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.rankDataList.extractFrom(stream);
		this.lowestRank.extractFrom(stream);
		this.numRankedIn.extractFrom(stream);
		this.season.extractFrom(stream);
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

		json.__fields.rankDataList = this.rankDataList;
		json.__fields.lowestRank = this.lowestRank;
		json.__fields.numRankedIn = this.numRankedIn;
		json.__fields.season = this.season;

		return json;
	}
}
