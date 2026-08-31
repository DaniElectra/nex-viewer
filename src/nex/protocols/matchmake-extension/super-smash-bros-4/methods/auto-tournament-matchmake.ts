import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import AnyDataHolder from '@/nex/types/any-data-holder';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'AutoTournamentMatchmake';

	private unknown1 = new UInt32();
	private unknown2 = new UInt32();
	private anyGathering = new AnyDataHolder();
	private strMessage = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.anyGathering.extractFrom(stream);
		this.strMessage.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown1: this.unknown1,
			unknown2: this.unknown2,
			anyGathering: this.anyGathering,
			strMessage: this.strMessage
		};
	}
}

export class Response {
	public static Name = 'AutoTournamentMatchmake';

	private joinedGathering = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.joinedGathering.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			joinedGathering: this.joinedGathering
		};
	}
}
