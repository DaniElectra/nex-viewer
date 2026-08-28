import DDLClass from '@/nex/types/ddl-class';
import DateTime from '@/nex/types/datetime';
import UInt32 from '@/nex/types/uint32';
import Int32 from '@/nex/types/int32';
import UInt8 from '@/nex/types/uint8';
import Bool from '@/nex/types/bool';
import Double from '@/nex/types/double';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Ranking2ChartInfo';

export default class Ranking2ChartInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private createTime = new DateTime();
	private index = new UInt32();
	private category = new UInt32();
	private season = new Int32();
	private binsSize = new UInt8();
	private samplingRate = new UInt8();
	private scoreOrder = new Bool();
	private estimateLength = new UInt32();
	private estimateHighestScore = new UInt32();
	private estimateLowestScore = new UInt32();
	private estimateMedianScore = new UInt32();
	private estimateAverageScore = new Double();
	private highestBinsScore = new UInt32();
	private lowestBinsScore = new UInt32();
	private binsWidth = new UInt32();
	private attribute1 = new UInt32();
	private attribute2 = new UInt32();
	private quantities = new List(new UInt32());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.createTime.extractFrom(stream);
		this.index.extractFrom(stream);
		this.category.extractFrom(stream);
		this.season.extractFrom(stream);
		this.binsSize.extractFrom(stream);
		this.samplingRate.extractFrom(stream);
		this.scoreOrder.extractFrom(stream);
		this.estimateLength.extractFrom(stream);
		this.estimateHighestScore.extractFrom(stream);
		this.estimateLowestScore.extractFrom(stream);
		this.estimateMedianScore.extractFrom(stream);
		this.estimateAverageScore.extractFrom(stream);
		this.highestBinsScore.extractFrom(stream);
		this.lowestBinsScore.extractFrom(stream);
		this.binsWidth.extractFrom(stream);
		this.attribute1.extractFrom(stream);
		this.attribute2.extractFrom(stream);
		this.quantities.extractFrom(stream);
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

		json.__fields.createTime = this.createTime;
		json.__fields.index = this.index;
		json.__fields.category = this.category;
		json.__fields.season = this.season;
		json.__fields.binsSize = this.binsSize;
		json.__fields.samplingRate = this.samplingRate;
		json.__fields.scoreOrder = this.scoreOrder;
		json.__fields.estimateLength = this.estimateLength;
		json.__fields.estimateHighestScore = this.estimateHighestScore;
		json.__fields.estimateLowestScore = this.estimateLowestScore;
		json.__fields.estimateMedianScore = this.estimateMedianScore;
		json.__fields.estimateAverageScore = this.estimateAverageScore;
		json.__fields.highestBinsScore = this.highestBinsScore;
		json.__fields.lowestBinsScore = this.lowestBinsScore;
		json.__fields.binsWidth = this.binsWidth;
		json.__fields.attribute1 = this.attribute1;
		json.__fields.attribute2 = this.attribute2;
		json.__fields.quantities = this.quantities;

		return json;
	}
}
