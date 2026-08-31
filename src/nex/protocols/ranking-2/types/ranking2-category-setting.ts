import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt16 from '@/nex/types/uint16';
import UInt8 from '@/nex/types/uint8';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Ranking2CategorySetting';

export default class Ranking2CategorySetting extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private minScore = new UInt32();
	private maxScore = new UInt32();
	private lowestRank = new UInt32();
	private resetMonth = new UInt16();
	private resetDay = new UInt8();
	private resetHour = new UInt8();
	private resetMode = new UInt8();
	private maxSeasonsToGoBack = new UInt8();
	private scoreOrder = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.minScore.extractFrom(stream);
		this.maxScore.extractFrom(stream);
		this.lowestRank.extractFrom(stream);
		this.resetMonth.extractFrom(stream);
		this.resetDay.extractFrom(stream);
		this.resetHour.extractFrom(stream);
		this.resetMode.extractFrom(stream);
		this.maxSeasonsToGoBack.extractFrom(stream);
		this.scoreOrder.extractFrom(stream);
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

		json.__fields.minScore = this.minScore;
		json.__fields.maxScore = this.maxScore;
		json.__fields.lowestRank = this.lowestRank;
		json.__fields.resetMonth = this.resetMonth;
		json.__fields.resetDay = this.resetDay;
		json.__fields.resetHour = this.resetHour;
		json.__fields.resetMode = this.resetMode;
		json.__fields.maxSeasonsToGoBack = this.maxSeasonsToGoBack;
		json.__fields.scoreOrder = this.scoreOrder;

		return json;
	}
}
