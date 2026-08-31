import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import List from '@/nex/types/list';
import MatchmakeRefereePersonalRoundResult from '@/nex/protocols/matchmake-referee/types/matchmake-referee-personal-round-result';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MatchmakeRefereeEndRoundParam';

export default class MatchmakeRefereeEndRoundParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private roundId = new UInt64();
	private personalRoundResults = new List(new MatchmakeRefereePersonalRoundResult());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.roundId.extractFrom(stream);
		this.personalRoundResults.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				roundId: this.roundId,
				personalRoundResults: this.personalRoundResults
			}
		};
	}
}
