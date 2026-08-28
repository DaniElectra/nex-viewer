import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import Bool from '@/nex/types/bool';
import UInt16 from '@/nex/types/uint16';
import RVBuffer from '@/nex/types/buffer';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * This comes from https://github.com/PretendoNetwork/nex-viewer/blob/8dec0a64276bd508734276f3443639b68b808366/src/protocols/requests/matchmake_extension_mk8.js
// * but the docs have no structure. Is this correct?
export class Request {
	public static Name = 'JoinMatchmakeSessionWithExtraParticipants';

	private gid = new UInt32();
	private joinMessage = new RVString();
	private ignoreBlacklist = new Bool();
	private participationCount = new UInt16();
	private extraParticipants = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.gid.extractFrom(stream);
		this.joinMessage.extractFrom(stream);
		this.ignoreBlacklist.extractFrom(stream);
		this.participationCount.extractFrom(stream);
		this.extraParticipants.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			gid: this.gid,
			joinMessage: this.joinMessage,
			ignoreBlacklist: this.ignoreBlacklist,
			participationCount: this.participationCount,
			extraParticipants: this.extraParticipants
		};
	}
}

// * This comes from https://github.com/PretendoNetwork/nex-viewer/blob/8dec0a64276bd508734276f3443639b68b808366/src/protocols/responses/matchmake_extension_mk8.js
// * but the docs have no structure. Is this correct?
export class Response {
	public static Name = 'JoinMatchmakeSessionWithExtraParticipants';

	private sessionKey = new RVBuffer();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.sessionKey.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			sessionKey: this.sessionKey
		};
	}
}
