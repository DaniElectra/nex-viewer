import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import QResult from '@/nex/types/qresult';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CreateAccount';

	private strPrincipalName = new RVString();
	private strKey = new RVString();
	private uiGroups = new UInt32();
	private strEmail = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.strPrincipalName.extractFrom(stream);
		this.strKey.extractFrom(stream);
		this.uiGroups.extractFrom(stream);
		this.strEmail.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strPrincipalName: this.strPrincipalName,
			strKey: this.strKey,
			uiGroups: this.uiGroups,
			strEmail: this.strEmail
		};
	}
}

export class Response {
	public static Name = 'CreateAccount';

	private retval = new QResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.retval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval
		};
	}
}
