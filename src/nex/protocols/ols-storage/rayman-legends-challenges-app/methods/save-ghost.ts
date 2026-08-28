import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import Float from '@/nex/types/float';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SaveGhost';

	private id_ghost = new UInt64();
	private id_competition = new UInt32();
	private id_costume = new UInt32();
	private score = new Float();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.id_ghost.extractFrom(stream);
		this.id_competition.extractFrom(stream);
		this.id_costume.extractFrom(stream);
		this.score.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id_ghost: this.id_ghost,
			id_competition: this.id_competition,
			id_costume: this.id_costume,
			score: this.score
		};
	}
}

// * No response data
export class Response {
	public static Name = 'SaveGhost';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
