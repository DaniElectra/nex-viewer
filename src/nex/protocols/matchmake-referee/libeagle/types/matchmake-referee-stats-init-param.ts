import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MatchmakeRefereeStatsInitParam';

export default class MatchmakeRefereeStatsInitParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private category = new UInt32();
	private initialRatingValue = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.category.extractFrom(stream);
		this.initialRatingValue.extractFrom(stream);
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
		json.__fields.initialRatingValue = this.initialRatingValue;

		return json;
	}
}
