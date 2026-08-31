import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import ResultRange from '@/nex/types/result-range';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CompetitionRankingInfoGetParam';

export default class CompetitionRankingInfoGetParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private rankOrder = new UInt8();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.rankOrder.extractFrom(stream);
		this.resultRange.extractFrom(stream);
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

		json.__fields.rankOrder = this.rankOrder;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
