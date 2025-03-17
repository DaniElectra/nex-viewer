import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

export default class AccountExtraInfo extends Structure {
	public readonly typeName = 'AccountExtraInfo';

	private localFriendCode = new UInt64();
	private moveCount = new UInt32();
	private token = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.localFriendCode.extractFrom(stream);
		this.moveCount.extractFrom(stream);
		this.token.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				localFriendCode: this.localFriendCode,
				moveCount: this.moveCount,
				token: this.token
			}
		};
	}
}

AnyDataHolder.Classes['AccountExtraInfo'] = AccountExtraInfo;