import Data from '@/nex/types/data';
import PrincipalBasicInfo from '@/nex/protocols/friends-wiiu/types/principal-basic-info';
import FriendRequestMessage from '@/nex/protocols/friends-wiiu/types/friend-request-message';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class FriendRequest extends Data {
	public get typeName(): string {
		return 'FriendRequest';
	}

	private principalBasicInfo = new PrincipalBasicInfo();
	private message = new FriendRequestMessage();
	private sentOn = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.principalBasicInfo.extractFrom(stream);
		this.message.extractFrom(stream);
		this.sentOn.extractFrom(stream);
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
				principalBasicInfo: this.principalBasicInfo,
				message: this.message,
				sentOn: this.sentOn
			}
		};
	}
}