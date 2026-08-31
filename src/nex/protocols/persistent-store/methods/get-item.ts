import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import RVBuffer from '@/nex/types/buffer';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetItem';

	private uiGroup = new UInt32();
	private strTag = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiGroup.extractFrom(stream);
		this.strTag.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiGroup: this.uiGroup,
			strTag: this.strTag
		};
	}
}

export class Response {
	public static Name = 'GetItem';

	private bufData = new RVBuffer();
	private bResult = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.bufData.extractFrom(stream);
		this.bResult.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			bufData: this.bufData,
			bResult: this.bResult
		};
	}
}
