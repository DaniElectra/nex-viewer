import DateTime from '@/nex/types/datetime';
import UInt8 from '@/nex/types/uint8';
import RankingResult from '@/nex/protocols/ranking/types/ranking-result';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RankingCachedResult';

export default class RankingCachedResult extends RankingResult {
	public get typeName(): string {
		return className;
	}

	private createdTime = new DateTime();
	private expiredTime = new DateTime();
	private maxLength = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.createdTime.extractFrom(stream);
		this.expiredTime.extractFrom(stream);
		this.maxLength.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				createdTime: this.createdTime,
				expiredTime: this.expiredTime,
				maxLength: this.maxLength
			}
		};
	}
}
