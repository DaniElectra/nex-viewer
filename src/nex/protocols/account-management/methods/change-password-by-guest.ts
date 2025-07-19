import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ChangePasswordByGuest';

	private strPrincipalName = new RVString();
	private strEmail = new RVString();
	private strKey = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.strPrincipalName.extractFrom(stream);
		this.strEmail.extractFrom(stream);
		this.strKey.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strPrincipalName: this.strPrincipalName,
			strEmail: this.strEmail,
			strKey: this.strKey
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ChangePasswordByGuest';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
