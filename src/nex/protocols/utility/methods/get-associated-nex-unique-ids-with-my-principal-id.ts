import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UniqueIdInfo from '@/nex/protocols/utility/types/unique-id-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetAssociatedNexUniqueIdsWithMyPrincipalId';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetAssociatedNexUniqueIdsWithMyPrincipalId';

	private pUniqueIdInfo = new List(new UniqueIdInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pUniqueIdInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pUniqueIdInfo: this.pUniqueIdInfo
		};
	}
}
