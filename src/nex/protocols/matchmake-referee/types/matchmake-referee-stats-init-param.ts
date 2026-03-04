import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MatchmakeRefereeStatsInitParam';

export default class MatchmakeRefereeStatsInitParam extends Structure {
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
		return {
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				category: this.category,
				initialRatingValue: this.initialRatingValue
			}
		};
	}
}
