import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import OLSSelectionRow from '@/nex/protocols/ols-storage/types/ols-selection-row';
import OLSTomb from '@/nex/protocols/ols-storage/types/ols-tomb';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'QuerySmartSelection';

	private id_leaderboard = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.id_leaderboard.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id_leaderboard: this.id_leaderboard
		};
	}
}

export class Response {
	public static Name = 'QuerySmartSelection';

	private ghosts = new List(new OLSSelectionRow());
	private tombs = new List(new OLSTomb());
	private numParticipants = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ghosts.extractFrom(stream);
		this.tombs.extractFrom(stream);
		this.numParticipants.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ghosts: this.ghosts,
			tombs: this.tombs,
			numParticipants: this.numParticipants
		};
	}
}
