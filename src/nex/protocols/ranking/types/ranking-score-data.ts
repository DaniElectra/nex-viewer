import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RankingScoreData';

export default class RankingScoreData extends Structure {
	public get typeName(): string {
		return className;
	}

	private category = new UInt32();
	private score = new UInt32();
	private orderBy = new UInt8();
	private updateMode = new UInt8();
	private groups = new List(new UInt8());
	private param = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.category.extractFrom(stream);
		this.score.extractFrom(stream);
		this.orderBy.extractFrom(stream);
		this.updateMode.extractFrom(stream);
		this.groups.extractFrom(stream);
		this.param.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				category: this.category,
				score: this.score,
				orderBy: this.orderBy,
				updateMode: this.updateMode,
				groups: this.groups,
				param: this.param
			}
		};
	}
}
