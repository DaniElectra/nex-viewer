import NEXByteStream from '@/nex/byte-stream';
import EndBattleModeParam from '@/nex/protocols/datastore/super-mario-maker-2/types/end-battle-mode-param';
import BattleModeRating from '@/nex/protocols/datastore/super-mario-maker-2/types/battle-mode-rating';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'EndBattleMode';

	private param = new EndBattleModeParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'EndBattleMode';

	private rating1 = new BattleModeRating();
	private rating2 = new BattleModeRating();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.rating1.extractFrom(stream);
		this.rating2.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			rating1: this.rating1,
			rating2: this.rating2
		};
	}
}
