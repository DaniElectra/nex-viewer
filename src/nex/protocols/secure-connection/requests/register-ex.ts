import NEXByteStream from '@/nex/byte-stream';
import RMCMessage from '@/nex/rmc-message';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import AnyDataHolder from '@/nex/types/any-data-holder';

export default class RegisterExRequest {
	public static Name = 'RegisterEx';

	private vecMyURLs = new List(new StationURL());
	private hCustomData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData, message.connection.title.settings);

		this.vecMyURLs.extractFrom(stream);
		this.hCustomData.extractFrom(stream);
	}

	public toJSON(): Record<string, any> {
		return {
			vecMyURLs: this.vecMyURLs,
			hCustomData: this.hCustomData
		};
	}
}