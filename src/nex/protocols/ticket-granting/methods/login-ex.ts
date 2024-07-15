import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import QResult from '@/nex/types/qresult';
import PID from '@/nex/types/pid';
import RVBuffer from '@/nex/types/buffer';
import RVConnectionData from '@/nex/types/rv-connection-data';

export class Request {
	public static Name = 'LoginEx';

	private strUserName = new RVString();
	private oExtraData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.strUserName.extractFrom(stream);
		this.oExtraData.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			strUserName: this.strUserName,
			oExtraData: this.oExtraData
		};
	}
}

export class Response {
	public static Name = 'LoginEx';

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