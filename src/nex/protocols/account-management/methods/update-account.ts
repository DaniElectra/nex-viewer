import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateAccount';

	private strKey = new RVString();
	private strEmail = new RVString();
	private oPublicData = new AnyDataHolder();
	private oPrivateData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.strKey.extractFrom(stream);
		this.strEmail.extractFrom(stream);
		this.oPublicData.extractFrom(stream);
		this.oPrivateData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strKey: this.strKey,
			strEmail: this.strEmail,
			oPublicData: this.oPublicData,
			oPrivateData: this.oPrivateData
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UpdateAccount';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
