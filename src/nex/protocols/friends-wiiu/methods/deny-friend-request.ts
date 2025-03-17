import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import BlacklistedPrincipal from '@/nex/protocols/friends-wiiu/types/blacklisted-principal';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DenyFriendRequest';

	private id = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.id.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id: this.id
		};
	}
}

export class Response {
	public static Name = 'DenyFriendRequest';

	private blacklistedPrincipal = new BlacklistedPrincipal();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.blacklistedPrincipal.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			blacklistedPrincipal: this.blacklistedPrincipal
		};
	}
}