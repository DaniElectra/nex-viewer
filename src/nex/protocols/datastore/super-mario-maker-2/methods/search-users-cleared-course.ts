import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SearchUsersClearedCourseParam from '@/nex/protocols/datastore/super-mario-maker-2/types/search-users-cleared-course-param';
import UserInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/user-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchUsersClearedCourse';

	private param = new SearchUsersClearedCourseParam();

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
	public static Name = 'SearchUsersClearedCourse';

	private users = new List(new UserInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.users.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			users: this.users
		};
	}
}
