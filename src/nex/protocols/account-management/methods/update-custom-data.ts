import NEXByteStream from '@/nex/byte-stream';
import AnyDataHolder from '@/nex/types/any-data-holder';
import QResult from '@/nex/types/qresult';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateCustomData';

	private oPublicData = new AnyDataHolder();
	private oPrivateData = new AnyDataHolder();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.oPublicData.extractFrom(stream);
		this.oPrivateData.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			oPublicData: this.oPublicData,
			oPrivateData: this.oPrivateData
		};
	}
}

export class Response {
	public static Name = 'UpdateCustomData';

	private retval = new QResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.retval.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			retval: this.retval
		};
	}
}
