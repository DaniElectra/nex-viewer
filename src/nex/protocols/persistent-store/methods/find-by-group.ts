import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindByGroup';

	private uiGroup = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uiGroup.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiGroup: this.uiGroup
		};
	}
}

export class Response {
	public static Name = 'FindByGroup';

	private lstTags = new List(new RVString());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.lstTags.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			lstTags: this.lstTags
		};
	}
}
