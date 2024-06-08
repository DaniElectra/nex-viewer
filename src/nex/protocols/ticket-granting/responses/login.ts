import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import QResult from '@/nex/types/qresult';
import PID from '@/nex/types/pid';
import RVBuffer from '@/nex/types/buffer';
import RVConnectionData from '@/nex/types/rv-connection-data';
import RVString from '@/nex/types/string';

export default class LoginResponse {
	public static Name = 'Login';

	private retval = new QResult();
	private pidPrincipal = new PID();
	private pbufResponse = new RVBuffer();
	private pConnectionData = new RVConnectionData();
	private strReturnMsg = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.retval.extractFrom(stream);

		// * Wiki states:
		// * "If the username does not exist, the %retval% field is set to RendezVous::InvalidUsername and the other fields are left blank."
		// TODO - Is this handled correctly?
		if (this.retval.isSuccess()) {
			this.pidPrincipal.extractFrom(stream);
			this.pbufResponse.extractFrom(stream);
			this.pConnectionData.extractFrom(stream);
			this.strReturnMsg.extractFrom(stream);
		}
	}

	public toJSON(): Record<string, any> {
		return {
			retval: this.retval,
			pidPrincipal: this.pidPrincipal,
			pbufResponse: this.pbufResponse,
			pConnectionData: this.pConnectionData,
			strReturnMsg: this.strReturnMsg.value
		};
	}
}