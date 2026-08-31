import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import QResult from '@/nex/types/qresult';
import GetCoursesParam from '@/nex/protocols/datastore/super-mario-maker-2/types/get-courses-param';
import GetCoursesEventParam from '@/nex/protocols/datastore/super-mario-maker-2/types/get-courses-event-param';
import EventCourseInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/event-course-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCoursesEvent';

	private courseParam = new GetCoursesParam();
	private eventParam = new GetCoursesEventParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.courseParam.extractFrom(stream);
		this.eventParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			courseParam: this.courseParam,
			eventParam: this.eventParam
		};
	}
}

export class Response {
	public static Name = 'GetCoursesEvent';

	private eventCourses = new List(new EventCourseInfo());
	private results = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.eventCourses.extractFrom(stream);
		this.results.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			eventCourses: this.eventCourses,
			results: this.results
		};
	}
}
