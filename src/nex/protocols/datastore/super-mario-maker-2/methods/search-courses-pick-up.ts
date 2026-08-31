import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SearchCoursesPickUpParam from '@/nex/protocols/datastore/super-mario-maker-2/types/search-courses-pick-up-param';
import CourseInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/course-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchCoursesPickUp';

	private param = new SearchCoursesPickUpParam();

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
	public static Name = 'SearchCoursesPickUp';

	private courses = new List(new CourseInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.courses.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			courses: this.courses
		};
	}
}
