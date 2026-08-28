import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import QResult from '@/nex/types/qresult';
import GetCoursesParam from '@/nex/protocols/datastore/super-mario-maker-2/types/get-courses-param';
import CourseInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/course-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCourses';

	private param = new GetCoursesParam();

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
	public static Name = 'GetCourses';

	private courseInfo = new List(new CourseInfo());
	private resultCodes = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.courseInfo.extractFrom(stream);
		this.resultCodes.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			courseInfo: this.courseInfo,
			resultCodes: this.resultCodes
		};
	}
}
