import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import RVString from '@/nex/types/string';

export default class LoginRequest {
	public static Name = 'Login';

	private strUserName = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.strUserName.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			strUserName: this.strUserName
		};
	}
}