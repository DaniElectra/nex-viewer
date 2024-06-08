import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import QResult from '@/nex/types/qresult';
import UInt32 from '@/nex/types/uint32';
import StationURL from '@/nex/types/station-url';

export default class RegisterResponse {
	public static Name = 'Register';

	private retval = new QResult();
	private pidConnectionID = new UInt32();
	private urlPublic = new StationURL();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.retval.extractFrom(stream);

		// TODO - Is this handled correctly?
		if (this.retval.isSuccess()) {
			this.pidConnectionID.extractFrom(stream);
			this.urlPublic.extractFrom(stream);
		}
	}

	public toJSON(): Record<string, any> {
		return {
			retval: this.retval,
			pidConnectionID: this.pidConnectionID,
			urlPublic: this.urlPublic
		};
	}
}