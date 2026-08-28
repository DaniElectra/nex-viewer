import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import OLSLdbRow from '@/nex/protocols/ols-storage/rayman-legends-challenges-app/types/ols-ldb-row';
import Float from '@/nex/types/float';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'QueryLeaderboard';

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
	public static Name = 'QueryLeaderboard';

	private result = new List(new OLSLdbRow());
	private graduations = new List(new Float());
	private envelope = new List(new UInt32());
	private unit = new UInt32();
	private my_country = new UInt32();
	private participants = new UInt32();
	private cacheable = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.result.extractFrom(stream);
		this.graduations.extractFrom(stream);
		this.envelope.extractFrom(stream);
		this.unit.extractFrom(stream);
		this.my_country.extractFrom(stream);
		this.participants.extractFrom(stream);
		this.cacheable.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			result: this.result,
			graduations: this.graduations,
			envelope: this.envelope,
			unit: this.unit,
			my_country: this.my_country,
			participants: this.participants,
			cacheable: this.cacheable
		};
	}
}
