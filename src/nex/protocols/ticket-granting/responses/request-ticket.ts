import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import QResult from '@/nex/types/qresult';
import RVBuffer from '@/nex/types/buffer';
import RVString from '@/nex/types/string';

export default class RequestTicketResponse {
	public static Name = 'RequestTicket';

	private retval = new QResult();
	private bufResponse = new RVBuffer();
	private pSourceKey = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData, message.connection.title.settings);

		this.retval.extractFrom(stream);

		// * Wiki states:
		// * "If the source or target pid is invalid, the %retval% field is set to Core::AccessDenied and the ticket is empty."
		// TODO - Is this handled correctly?
		if (this.retval.isSuccess()) {
			this.bufResponse.extractFrom(stream);

			// * Only on the Switch
			// TODO - Is this a good enough check?
			if (stream.hasDataLeft()) {
				this.pSourceKey.extractFrom(stream);
			}
		}
	}

	public toJSON(): Record<string, any> {
		return {
			retval: this.retval,
			bufResponse: this.bufResponse,
			pSourceKey: this.pSourceKey.value
		};
	}
}