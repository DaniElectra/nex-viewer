import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';

export default class LoginExRequest {
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