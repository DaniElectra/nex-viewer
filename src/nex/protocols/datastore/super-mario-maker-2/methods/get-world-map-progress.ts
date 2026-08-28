import NEXByteStream from '@/nex/byte-stream';
import GetWorldMapProgressParam from '@/nex/protocols/datastore/super-mario-maker-2/types/get-world-map-progress-param';
import WorldMapProgressInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/world-map-progress-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetWorldMapProgress';

	private param = new GetWorldMapProgressParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'GetWorldMapProgress';

	private progressInfo = new WorldMapProgressInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.progressInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			progressInfo: this.progressInfo
		};
	}
}
