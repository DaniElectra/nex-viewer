import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CreateAccountWithCustomData';

	private strPrincipalName = new RVString();
	private strKey = new RVString();
	private uiGroups = new UInt32();
	private strEmail = new RVString();
	private oPublicData = new AnyDataHolder();
	private oPrivateData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.strPrincipalName.extractFrom(stream);
		this.strKey.extractFrom(stream);
		this.uiGroups.extractFrom(stream);
		this.strEmail.extractFrom(stream);
		this.oPublicData.extractFrom(stream);
		this.oPrivateData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strPrincipalName: this.strPrincipalName,
			strKey: this.strKey,
			uiGroups: this.uiGroups,
			strEmail: this.strEmail,
			oPublicData: this.oPublicData,
			oPrivateData: this.oPrivateData
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CreateAccountWithCustomData';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
