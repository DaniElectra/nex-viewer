import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCustomItem';

	private uiGroup = new UInt32();
	private strTag = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiGroup.extractFrom(stream);
		this.strTag.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiGroup: this.uiGroup,
			strTag: this.strTag
		};
	}
}

export class Response {
	public static Name = 'GetCustomItem';

	private hData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.hData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			hData: this.hData
		};
	}
}
