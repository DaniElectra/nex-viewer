import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import ScorePack from '@/nex/protocols/ranking/mario-kart-8-deluxe/types/score-pack';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetScorePack';

	private pids = new List(new PID());
	private category = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pids.extractFrom(stream);
		this.category.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pids: this.pids,
			category: this.category
		};
	}
}

export class Response {
	public static Name = 'GetScorePack';

	private scorePack = new ScorePack();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.scorePack.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			scorePack: this.scorePack
		};
	}
}
