import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import BattleModeRating from '@/nex/protocols/datastore/super-mario-maker-2/types/battle-mode-rating';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetBattleModeRating';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetBattleModeRating';

	private unknown = new Bool();
	private rating1 = new BattleModeRating();
	private rating2 = new BattleModeRating();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.unknown.extractFrom(stream);
		this.rating1.extractFrom(stream);
		this.rating2.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			unknown: this.unknown,
			rating1: this.rating1,
			rating2: this.rating2
		};
	}
}
