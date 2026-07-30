import List from '@/nex/types/list';
import NEXByteStream from '@/nex/byte-stream';
import type RMCMessage from '@/nex/rmc-message';
import PID from '@/nex/types/pid';

export class Request {
	public static Name = 'AddTarget';

	private targets = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.targets.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			targets: this.targets
		};
	}
}

// * No response data
export class Response {
	public static Name = 'AddTarget';

	constructor() { }

	public toJSON(): any {
		return {};
	}
}
