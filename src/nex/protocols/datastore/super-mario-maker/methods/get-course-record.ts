import NEXByteStream from '@/nex/byte-stream';
import DataStoreGetCourseRecordParam from '@/nex/protocols/datastore/super-mario-maker/types/datastore-get-course-record-param';
import DataStoreGetCourseRecordResult from '@/nex/protocols/datastore/super-mario-maker/types/datastore-get-course-record-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCourseRecord';

	private param = new DataStoreGetCourseRecordParam();

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
	public static Name = 'GetCourseRecord';

	private result = new DataStoreGetCourseRecordResult();

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
