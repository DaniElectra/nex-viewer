import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import OLSSelectionRow from '@/nex/protocols/ols-storage/rayman-legends-challenges-app/types/ols-selection-row';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSCompetitionInfos';

export default class OLSCompetitionInfos extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private id_competition = new UInt32();
	private participants = new UInt32();
	private friends = new List(new UInt32());
	private level_id = new UInt32();
	private mode = new UInt32();
	private my_rank = new UInt32();
	private remaining_seconds = new UInt32();
	private competitors = new List(new OLSSelectionRow());
	private unit = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.id_competition.extractFrom(stream);
		this.participants.extractFrom(stream);
		this.friends.extractFrom(stream);
		this.level_id.extractFrom(stream);
		this.mode.extractFrom(stream);
		this.my_rank.extractFrom(stream);
		this.remaining_seconds.extractFrom(stream);
		this.competitors.extractFrom(stream);
		this.unit.extractFrom(stream);
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

		json.__fields.id_competition = this.id_competition;
		json.__fields.participants = this.participants;
		json.__fields.friends = this.friends;
		json.__fields.level_id = this.level_id;
		json.__fields.mode = this.mode;
		json.__fields.my_rank = this.my_rank;
		json.__fields.remaining_seconds = this.remaining_seconds;
		json.__fields.competitors = this.competitors;
		json.__fields.unit = this.unit;

		return json;
	}
}
