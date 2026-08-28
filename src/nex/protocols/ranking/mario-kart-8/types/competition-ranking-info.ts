import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CompetitionRankingInfo';

export default class CompetitionRankingInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private id = new UInt32();
	private numberOfParticipants = new UInt32();
	private teamScores = new List(new UInt32());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.id.extractFrom(stream);
		this.numberOfParticipants.extractFrom(stream);
		this.teamScores.extractFrom(stream);
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

		json.__fields.id = this.id;
		json.__fields.numberOfParticipants = this.numberOfParticipants;
		json.__fields.teamScores = this.teamScores;

		return json;
	}
}
