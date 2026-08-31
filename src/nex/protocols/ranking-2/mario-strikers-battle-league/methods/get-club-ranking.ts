import NEXByteStream from '@/nex/byte-stream';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetClubRanking';

	private parameters: Buffer;

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.parameters = stream.readRest(); // * The structure for this request is unknown, just show all of this in the UI
	}

	public toJSON(): any {
		return {
			parameters: this.parameters.toString('hex')
		};
	}
}

export class Response {
	public static Name = 'GetClubRanking';

	private parameters: Buffer;

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.parameters = stream.readRest(); // * The structure for this response is unknown, just show all of this in the UI
	}

	public toJSON(): any {
		return {
			parameters: this.parameters.toString('hex')
		};
	}
}
