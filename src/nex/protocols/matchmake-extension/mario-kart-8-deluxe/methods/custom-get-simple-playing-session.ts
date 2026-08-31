import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt8 from '@/nex/types/uint8';
import SimplePlayingSession from '@/nex/protocols/match-making/types/simple-playing-session';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CustomGetSimplePlayingSession';

	private pids = new List(new PID());
	private unknown1 = new UInt8();
	private unknown2 = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pids.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pids: this.pids,
			unknown1: this.unknown1,
			unknown2: this.unknown2
		};
	}
}

export class Response {
	public static Name = 'CustomGetSimplePlayingSession';

	private playingSessions = new List(new SimplePlayingSession());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.playingSessions.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			playingSessions: this.playingSessions
		};
	}
}
