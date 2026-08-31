import NEXByteStream from '@/nex/byte-stream';
import GetUserOrCourseParam from '@/nex/protocols/datastore/super-mario-maker-2/types/get-user-or-course-param';
import UserInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/user-info';
import CourseInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/course-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetUserOrCourse';

	private param = new GetUserOrCourseParam();

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
	public static Name = 'GetUserOrCourse';

	private userInfo = new UserInfo();
	private courseInfo = new CourseInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.userInfo.extractFrom(stream);
		this.courseInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			userInfo: this.userInfo,
			courseInfo: this.courseInfo
		};
	}
}
