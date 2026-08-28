import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetClusterMembers';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetClusterMembers';

	private strValues = new List(new RVString());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.strValues.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			strValues: this.strValues
		};
	}
}
