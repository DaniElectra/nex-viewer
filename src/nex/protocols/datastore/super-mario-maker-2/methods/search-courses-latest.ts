import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Bool from '@/nex/types/bool';
import SearchCoursesLatestParam from '@/nex/protocols/datastore/super-mario-maker-2/types/search-courses-latest-param';
import CourseInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/course-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchCoursesLatest';

	private param = new SearchCoursesLatestParam();

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
	public static Name = 'SearchCoursesLatest';

	private courses = new List(new CourseInfo());
	private result = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.courses.extractFrom(stream);
		this.result.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			courses: this.courses,
			result: this.result
		};
	}
}
