import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateAccountEffectiveDate';

	private idPrincipal = new PID();
	private dtEffectiveFrom = new DateTime();
	private strNotEffectiveMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.idPrincipal.extractFrom(stream);
		this.dtEffectiveFrom.extractFrom(stream);
		this.strNotEffectiveMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			idPrincipal: this.idPrincipal,
			dtEffectiveFrom: this.dtEffectiveFrom,
			strNotEffectiveMessage: this.strNotEffectiveMessage
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateAccountEffectiveDate';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}