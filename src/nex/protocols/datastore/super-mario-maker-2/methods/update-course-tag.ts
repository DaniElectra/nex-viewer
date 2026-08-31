import NEXByteStream from '@/nex/byte-stream';
import UpdateCourseTagParam from '@/nex/protocols/datastore/super-mario-maker-2/types/update-course-tag-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateCourseTag';

	private param = new UpdateCourseTagParam();

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
	public static Name = 'UpdateCourseTag';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
