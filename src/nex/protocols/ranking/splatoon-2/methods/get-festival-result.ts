import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import FestivalResult from '@/nex/protocols/ranking/splatoon-2/types/festival-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetFestivalResult';

	private festivalId = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.festivalId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			festivalId: this.festivalId
		};
	}
}

export class Response {
	public static Name = 'GetFestivalResult';

	private result = new FestivalResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.result.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			result: this.result
		};
	}
}
