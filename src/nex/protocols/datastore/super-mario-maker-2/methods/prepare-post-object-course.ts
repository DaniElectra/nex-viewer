import NEXByteStream from '@/nex/byte-stream';
import PreparePostCourseParam from '@/nex/protocols/datastore/super-mario-maker-2/types/prepare-post-course-param';
import DataStoreReqPostInfo from '@/nex/protocols/datastore/types/datastore-req-post-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PreparePostObjectCourse';

	private param = new PreparePostCourseParam();

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
	public static Name = 'PreparePostObjectCourse';

	private info = new DataStoreReqPostInfo();

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
