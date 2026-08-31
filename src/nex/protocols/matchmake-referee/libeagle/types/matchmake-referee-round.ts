import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import List from '@/nex/types/list';
import MatchmakeRefereePersonalRoundResult from '@/nex/protocols/matchmake-referee/libeagle/types/matchmake-referee-personal-round-result';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MatchmakeRefereeRound';

export default class MatchmakeRefereeRound extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private roundId = new UInt64();
	private gid = new UInt32();
	private state = new UInt32();
	private personalDataCategory = new UInt32();
	private normalizedPersonalRoundResults = new List(new MatchmakeRefereePersonalRoundResult());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.roundId.extractFrom(stream);
		this.gid.extractFrom(stream);
		this.state.extractFrom(stream);
		this.personalDataCategory.extractFrom(stream);
		this.normalizedPersonalRoundResults.extractFrom(stream);
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

		json.__fields.roundId = this.roundId;
		json.__fields.gid = this.gid;
		json.__fields.state = this.state;
		json.__fields.personalDataCategory = this.personalDataCategory;
		json.__fields.normalizedPersonalRoundResults = this.normalizedPersonalRoundResults;

		return json;
	}
}
