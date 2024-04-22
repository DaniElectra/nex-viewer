import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import PID from '@/nex/types/pid';

export default class RequestTicketRequest {
	public static Name = 'RequestTicket';

	private idSource = new PID();
	private idTarget = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData, message.connection.title.settings);

		this.idSource.extractFrom(stream);
		this.idTarget.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			idSource: this.idSource,
			idTarget: this.idTarget
		};
	}
}