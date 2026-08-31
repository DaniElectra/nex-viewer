import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import UInt64 from '@/nex/types/uint64';
import Float from '@/nex/types/float';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSSelectionRow';

export default class OLSSelectionRow extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private ID = new UInt32();
	private name = new RVString();
	private id_ghost = new UInt64();
	private id_costume = new UInt32();
	private country = new UInt32();
	private level = new UInt32();
	private rank = new UInt32();
	private score = new Float();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.ID.extractFrom(stream);
		this.name.extractFrom(stream);
		this.id_ghost.extractFrom(stream);
		this.id_costume.extractFrom(stream);
		this.country.extractFrom(stream);
		this.level.extractFrom(stream);
		this.rank.extractFrom(stream);
		this.score.extractFrom(stream);
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

		json.__fields.ID = this.ID;
		json.__fields.name = this.name;
		json.__fields.id_ghost = this.id_ghost;
		json.__fields.id_costume = this.id_costume;
		json.__fields.country = this.country;
		json.__fields.level = this.level;
		json.__fields.rank = this.rank;
		json.__fields.score = this.score;

		return json;
	}
}
