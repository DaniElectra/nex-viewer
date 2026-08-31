import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import CustomRankingData from '@/nex/protocols/datastore/real-escape-game-3ds/types/custom-ranking-data';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CustomRankingEntryParam';

export default class CustomRankingEntryParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private customRankingData = new CustomRankingData();
	private answer = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.customRankingData.extractFrom(stream);
		this.answer.extractFrom(stream);
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

		json.__fields.customRankingData = this.customRankingData;
		json.__fields.answer = this.answer;

		return json;
	}
}
