import NEXByteStream from '@/nex/byte-stream';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import RVBuffer from '@/nex/types/buffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CustomJoinMatchmakeSessionEx';

	private gid = new UInt32();
	private strMessage = new RVString();
	private participationCount = new UInt16();
	private unknown = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.gid.extractFrom(stream);
		this.strMessage.extractFrom(stream);
		this.participationCount.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			strMessage: this.strMessage,
			participationCount: this.participationCount,
			unknown: this.unknown
		};
	}
}

export class Response {
	public static Name = 'CustomJoinMatchmakeSessionEx';

	private sessionKey = new RVBuffer();
	private unknown = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.sessionKey.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			sessionKey: this.sessionKey,
			unknown: this.unknown
		};
	}
}
