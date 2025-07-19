import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import PrincipalBasicInfo from '@/nex/protocols/friends-wiiu/types/principal-basic-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetBasicInfo';

	private pids = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.pids.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pids: this.pids
		};
	}
}

export class Response {
	public static Name = 'GetBasicInfo';

	private infos = new List(new PrincipalBasicInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.infos.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			infos: this.infos
		};
	}
}
