import NEXByteStream from '@/nex/byte-stream';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetMatchmakeExtensionSetting';

	private settingName = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.settingName.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			settingName: this.settingName
		};
	}
}

export class Response {
	public static Name = 'GetMatchmakeExtensionSetting';

	private settingValue = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.settingValue.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			settingValue: this.settingValue
		};
	}
}
