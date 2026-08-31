import NEXByteStream from '@/nex/byte-stream';
import DataStoreUploadCourseRecordParam from '@/nex/protocols/datastore/super-mario-maker/types/datastore-upload-course-record-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadCourseRecord';

	private param = new DataStoreUploadCourseRecordParam();

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

// * No response data
export class Response {
	public static Name = 'UploadCourseRecord';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
