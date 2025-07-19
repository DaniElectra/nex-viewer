import NEXByteStream from '@/nex/byte-stream';
import UniqueIdInfo from '@/nex/protocols/utility/types/unique-id-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AssociateNexUniqueIdWithMyPrincipalId';

	private uniqueIdInfo = new UniqueIdInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.uniqueIdInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uniqueIdInfo: this.uniqueIdInfo
		};
	}
}

// * No response data
export class Response {
	public static Name = 'AssociateNexUniqueIdWithMyPrincipalId';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
