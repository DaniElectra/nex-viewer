import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateAccountExpiryDate';

	private idPrincipal = new PID();
	private dtExpiry = new DateTime();
	private strExpiredMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idPrincipal.extractFrom(stream);
		this.dtExpiry.extractFrom(stream);
		this.strExpiredMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idPrincipal: this.idPrincipal,
			dtExpiry: this.dtExpiry,
			strExpiredMessage: this.strExpiredMessage
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateAccountExpiryDate';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
