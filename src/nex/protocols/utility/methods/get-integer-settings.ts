import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVMap from '@/nex/types/map';
import UInt16 from '@/nex/types/uint16';
import Int32 from '@/nex/types/int32';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetIntegerSettings';

	private integerSettingIndex = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.integerSettingIndex.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			integerSettingIndex: this.integerSettingIndex
		};
	}
}

export class Response {
	public static Name = 'GetIntegerSettings';

	private integerSettings = new RVMap(new UInt16(), new Int32());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.integerSettings.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			integerSettings: this.integerSettings
		};
	}
}
