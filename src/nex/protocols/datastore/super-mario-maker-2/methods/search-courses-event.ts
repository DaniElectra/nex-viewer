import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SearchCoursesEventParam from '@/nex/protocols/datastore/super-mario-maker-2/types/search-courses-event-param';
import EventCourseInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/event-course-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchCoursesEvent';

	private eventParam = new SearchCoursesEventParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.eventParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			eventParam: this.eventParam
		};
	}
}

export class Response {
	public static Name = 'SearchCoursesEvent';

	private eventCourses = new List(new EventCourseInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.eventCourses.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			eventCourses: this.eventCourses
		};
	}
}
