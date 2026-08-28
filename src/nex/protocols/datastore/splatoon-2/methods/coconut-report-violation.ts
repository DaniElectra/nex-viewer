import NEXByteStream from '@/nex/byte-stream';
import CoconutViolation from '@/nex/protocols/datastore/splatoon-2/types/coconut-violation';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CoconutReportViolation';

	private violation = new CoconutViolation();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.violation.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			violation: this.violation
		};
	}
}

// * No response data
export class Response {
	public static Name = 'CoconutReportViolation';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
