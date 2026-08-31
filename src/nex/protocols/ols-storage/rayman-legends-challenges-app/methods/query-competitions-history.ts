import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import OLSCompetitionResult from '@/nex/protocols/ols-storage/rayman-legends-challenges-app/types/ols-competition-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'QueryCompetitionsHistory';

	private begin = new UInt32();
	private amount = new UInt32();
	private id_competition_meta = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.begin.extractFrom(stream);
		this.amount.extractFrom(stream);
		this.id_competition_meta.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			begin: this.begin,
			amount: this.amount,
			id_competition_meta: this.id_competition_meta
		};
	}
}

export class Response {
	public static Name = 'QueryCompetitionsHistory';

	private history = new List(new OLSCompetitionResult());
	private total = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.history.extractFrom(stream);
		this.total.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			history: this.history,
			total: this.total
		};
	}
}
