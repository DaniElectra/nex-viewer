import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSCompetitionResult';

export default class OLSCompetitionResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private id_leaderboard = new UInt32();
	private name = new RVString();
	private begin = new DateTime();
	private end = new DateTime();
	private level = new UInt32();
	private mode = new UInt32();
	private rank = new UInt32();
	private max_rank = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.id_leaderboard.extractFrom(stream);
		this.name.extractFrom(stream);
		this.begin.extractFrom(stream);
		this.end.extractFrom(stream);
		this.level.extractFrom(stream);
		this.mode.extractFrom(stream);
		this.rank.extractFrom(stream);
		this.max_rank.extractFrom(stream);
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

		json.__fields.id_leaderboard = this.id_leaderboard;
		json.__fields.name = this.name;
		json.__fields.begin = this.begin;
		json.__fields.end = this.end;
		json.__fields.level = this.level;
		json.__fields.mode = this.mode;
		json.__fields.rank = this.rank;
		json.__fields.max_rank = this.max_rank;

		return json;
	}
}
