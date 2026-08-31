import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'JoinCommunityCompetitionByGatheringId';

	private gatheringID = new UInt32();
	private unknown1 = new Bool();
	private unknown2 = new Bool();
	private unknown3 = new RVString();
	private unknown4 = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.gatheringID.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.unknown4.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gatheringID: this.gatheringID,
			unknown1: this.unknown1,
			unknown2: this.unknown2,
			unknown3: this.unknown3,
			unknown4: this.unknown4
		};
	}
}

// * No response data
export class Response {
	public static Name = 'JoinCommunityCompetitionByGatheringId';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
