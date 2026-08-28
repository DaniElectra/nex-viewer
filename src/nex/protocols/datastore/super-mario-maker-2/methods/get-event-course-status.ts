import NEXByteStream from '@/nex/byte-stream';
import EventCourseStatusInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/event-course-status-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetEventCourseStatus';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetEventCourseStatus';

	private statusInfo = new EventCourseStatusInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.statusInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			statusInfo: this.statusInfo
		};
	}
}
