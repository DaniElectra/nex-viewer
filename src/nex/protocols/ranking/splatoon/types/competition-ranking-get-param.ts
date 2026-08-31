import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CompetitionRankingGetParam';

export default class CompetitionRankingGetParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown?: UInt32; // * Revision 1
	private resultRange?: ResultRange; // * Revision 1
	private festivalIDs?: List<UInt32>; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		if (this.revision >= 1) {
			this.unknown = new UInt32();
			this.unknown.extractFrom(stream);

			this.resultRange = new ResultRange();
			this.resultRange.extractFrom(stream);

			this.festivalIDs = new List(new UInt32());
			this.festivalIDs.extractFrom(stream);
		}
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

		if (this.unknown !== undefined) {
			json.__fields.unknown = this.unknown;
		}

		if (this.resultRange !== undefined) {
			json.__fields.resultRange = this.resultRange;
		}

		if (this.festivalIDs !== undefined) {
			json.__fields.festivalIDs = this.festivalIDs;
		}

		return json;
	}
}
