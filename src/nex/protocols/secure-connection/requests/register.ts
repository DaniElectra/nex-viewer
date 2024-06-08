import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';

export default class RegisterRequest {
	public static Name = 'Register';

	private vecMyURLs = new List(new StationURL());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title.settings);

		this.vecMyURLs.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			vecMyURLs: this.vecMyURLs
		};
	}
}