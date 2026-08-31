import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import List from '@/nex/types/list';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindItemsBySQLQuery';

	private uiGroup = new UInt32();
	private strTag = new RVString();
	private strQuery = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiGroup.extractFrom(stream);
		this.strTag.extractFrom(stream);
		this.strQuery.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiGroup: this.uiGroup,
			strTag: this.strTag,
			strQuery: this.strQuery
		};
	}
}

export class Response {
	public static Name = 'FindItemsBySQLQuery';

	private lstData = new List(new AnyDataHolder());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.lstData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstData: this.lstData
		};
	}
}
