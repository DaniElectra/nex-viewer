import NEXByteStream from '@/nex/byte-stream';
import ScreeningDataStoreContentParam from '@/nex/protocols/screening/types/screening-datastore-content-param';
import ScreeningUgcViolationParam from '@/nex/protocols/screening/types/screening-ugc-violation-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ReportDataStoreContent';

	private pContentParam = new ScreeningDataStoreContentParam();
	private pViolationParam = new ScreeningUgcViolationParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pContentParam.extractFrom(stream);
		this.pViolationParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pContentParam: this.pContentParam,
			pViolationParam: this.pViolationParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ReportDataStoreContent';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
