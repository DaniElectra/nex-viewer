import NEXByteStream from '@/nex/byte-stream';
import UniqueIdInfo from '@/nex/protocols/utility/types/unique-id-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetAssociatedNexUniqueIdWithMyPrincipalId';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetAssociatedNexUniqueIdWithMyPrincipalId';

	private pUniqueIdInfo = new UniqueIdInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pUniqueIdInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pUniqueIdInfo: this.pUniqueIdInfo
		};
	}
}
