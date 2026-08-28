import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Ranking2EstimateMyScoreRankInput';

export default class Ranking2EstimateMyScoreRankInput extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private category = new UInt32();
	private numSeasonsToGoBack = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.category.extractFrom(stream);
		this.numSeasonsToGoBack.extractFrom(stream);
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
		json.__fields.numSeasonsToGoBack = this.numSeasonsToGoBack;

		return json;
	}
}
