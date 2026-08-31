import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import RVBuffer from '@/nex/types/buffer';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'InsertItem';

	private uiGroup = new UInt32();
	private strTag = new RVString();
	private bufData = new RVBuffer();
	private bReplace = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiGroup.extractFrom(stream);
		this.strTag.extractFrom(stream);
		this.bufData.extractFrom(stream);
		this.bReplace.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiGroup: this.uiGroup,
			strTag: this.strTag,
			bufData: this.bufData,
			bReplace: this.bReplace
		};
	}
}

export class Response {
	public static Name = 'InsertItem';

	private bResult = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.bResult.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			bResult: this.bResult
		};
	}
}
