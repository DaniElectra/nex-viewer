import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import SimpleMatchmakeHostInfo from '@/nex/protocols/matchmake-extension/pokemon-generation-7/types/simple-matchmake-host-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SimpleMatchmake';

	private groupId = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.groupId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			groupId: this.groupId
		};
	}
}

export class Response {
	public static Name = 'SimpleMatchmake';

	private found = new Bool();
	private info = new SimpleMatchmakeHostInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.found.extractFrom(stream);
		this.info.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			found: this.found,
			info: this.info
		};
	}
}
