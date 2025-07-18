import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVMap from '@/nex/types/map';
import UInt16 from '@/nex/types/uint16';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetStringSettings';

	private stringSettingIndex = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.stringSettingIndex.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			stringSettingIndex: this.stringSettingIndex
		};
	}
}

export class Response {
	public static Name = 'GetStringSettings';

	private stringSettings = new RVMap(new UInt16(), new RVString());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.stringSettings.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			stringSettings: this.stringSettings
		};
	}
}
