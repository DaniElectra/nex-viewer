import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import Int32 from '@/nex/types/int32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Ranking2EstimateScoreRankOutput';

export default class Ranking2EstimateScoreRankOutput extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private rank = new UInt32();
	private length = new UInt32();
	private score = new UInt32();
	private category = new UInt32();
	private season = new Int32();
	private samplingRate = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.rank.extractFrom(stream);
		this.length.extractFrom(stream);
		this.score.extractFrom(stream);
		this.category.extractFrom(stream);
		this.season.extractFrom(stream);
		this.samplingRate.extractFrom(stream);
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

		json.__fields.rank = this.rank;
		json.__fields.length = this.length;
		json.__fields.score = this.score;
		json.__fields.category = this.category;
		json.__fields.season = this.season;
		json.__fields.samplingRate = this.samplingRate;

		return json;
	}
}
