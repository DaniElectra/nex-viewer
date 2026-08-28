import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RankingScore';

export default class RankingScore extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private category = new UInt32();
	private scores = new List(new UInt32());
	private unknown1 = new UInt8();
	private unknown2 = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.category.extractFrom(stream);
		this.scores.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
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

		json.__fields.category = this.category;
		json.__fields.scores = this.scores;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;

		return json;
	}
}
