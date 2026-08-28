import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Ranking2ScoreData';

export default class Ranking2ScoreData extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private misc = new UInt64();
	private category = new UInt32();
	private score = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.misc.extractFrom(stream);
		this.category.extractFrom(stream);
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

		json.__fields.misc = this.misc;
		json.__fields.category = this.category;
		json.__fields.score = this.score;

		return json;
	}
}
