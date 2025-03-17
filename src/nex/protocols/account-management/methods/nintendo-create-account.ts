import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import AnyDataHolder from '@/nex/types/any-data-holder';
import PID from '@/nex/types/pid';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'NintendoCreateAccount';

	private strPrincipalName = new RVString();
	private strKey = new RVString();
	private uiGroups = new UInt32();
	private strEmail = new RVString();
	private oAuthData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.strPrincipalName.extractFrom(stream);
		this.strKey.extractFrom(stream);
		this.uiGroups.extractFrom(stream);
		this.strEmail.extractFrom(stream);
		this.oAuthData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strPrincipalName: this.strPrincipalName,
			strKey: this.strKey,
			uiGroups: this.uiGroups,
			strEmail: this.strEmail,
			oAuthData: this.oAuthData
		};
	}
}

export class Response {
	public static Name = 'NintendoCreateAccount';

	private pid = new PID();
	private pidHMAC = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pid.extractFrom(stream);
		this.pidHMAC.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pid: this.pid,
			pidHMAC: this.pidHMAC
		};
	}
}