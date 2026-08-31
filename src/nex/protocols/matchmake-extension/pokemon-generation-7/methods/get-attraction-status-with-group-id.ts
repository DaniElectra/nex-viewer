import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import UInt16 from '@/nex/types/uint16';
import AttractionStatus from '@/nex/protocols/matchmake-extension/pokemon-generation-7/types/attraction-status';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetAttractionStatusWithGroupId';

	private groupId = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.groupId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			groupId: this.groupId
		};
	}
}

export class Response {
	public static Name = 'GetAttractionStatusWithGroupId';

	private attractionStatus = new AttractionStatus();
	private refreshInterval = new UInt16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.attractionStatus.extractFrom(stream);
		this.refreshInterval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			attractionStatus: this.attractionStatus,
			refreshInterval: this.refreshInterval
		};
	}
}
