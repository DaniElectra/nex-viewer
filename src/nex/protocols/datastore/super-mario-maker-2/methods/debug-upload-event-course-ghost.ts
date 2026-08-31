import NEXByteStream from '@/nex/byte-stream';
import DebugUploadEventCourseGhostParam from '@/nex/protocols/datastore/super-mario-maker-2/types/debug-upload-event-course-ghost-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DebugUploadEventCourseGhost';

	private param = new DebugUploadEventCourseGhostParam();

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
	public static Name = 'DebugUploadEventCourseGhost';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
