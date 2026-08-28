import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import RentalObjectUploadParam from '@/nex/protocols/datastore/xenoblade-chronicles-x/types/rental-object-upload-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DebugUploadRentalObject';

	private param = new RentalObjectUploadParam();
	private unknown = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param,
			unknown: this.unknown
		};
	}
}

export class Response {
	public static Name = 'DebugUploadRentalObject';

	private dataId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataId: this.dataId
		};
	}
}
