import NEXByteStream from '@/nex/byte-stream';
import ReadEventCourseListParam from '@/nex/protocols/datastore/super-mario-maker-2/types/read-event-course-list-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'ReadEventCourseList';

	private param = new ReadEventCourseListParam();

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
	public static Name = 'ReadEventCourseList';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
