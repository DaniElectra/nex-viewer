import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import DataStorePreparePostReplayParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-prepare-post-replay-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CheckPostReplay';

	private param = new DataStorePreparePostReplayParam();

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
	public static Name = 'CheckPostReplay';

	private pIsRequired = new Bool();
	private pIsRare = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pIsRequired.extractFrom(stream);
		this.pIsRare.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pIsRequired: this.pIsRequired,
			pIsRare: this.pIsRare
		};
	}
}
