import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'InsertCustomItem';

	private uiGroup = new UInt32();
	private strTag = new RVString();
	private hData = new AnyDataHolder();
	private bReplace = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiGroup.extractFrom(stream);
		this.strTag.extractFrom(stream);
		this.hData.extractFrom(stream);
		this.bReplace.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiGroup: this.uiGroup,
			strTag: this.strTag,
			hData: this.hData,
			bReplace: this.bReplace
		};
	}
}

// * No response data
export class Response {
	public static Name = 'InsertCustomItem';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
