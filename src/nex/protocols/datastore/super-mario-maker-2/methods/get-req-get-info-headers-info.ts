import NEXByteStream from '@/nex/byte-stream';
import UInt8 from '@/nex/types/uint8';
import ReqGetInfoHeadersInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/req-get-info-headers-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetReqGetInfoHeadersInfo';

	private dataType = new UInt8();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataType.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataType: this.dataType
		};
	}
}

export class Response {
	public static Name = 'GetReqGetInfoHeadersInfo';

	private info = new ReqGetInfoHeadersInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.info.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			info: this.info
		};
	}
}
