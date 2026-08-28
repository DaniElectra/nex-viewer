import NEXByteStream from '@/nex/byte-stream';
import PID from '@/nex/types/pid';
import OLSRichProfile from '@/nex/protocols/ols-storage/rayman-legends-challenges-app/types/ols-rich-profile';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'LoadIDCard';

	private pid = new PID();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pid.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pid: this.pid
		};
	}
}

export class Response {
	public static Name = 'LoadIDCard';

	private profile = new OLSRichProfile();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.profile.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			profile: this.profile
		};
	}
}
