import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import QResult from '@/nex/types/qresult';
import GetUsersParam from '@/nex/protocols/datastore/super-mario-maker-2/types/get-users-param';
import UserInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/user-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetUsers';

	private param = new GetUsersParam();

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
	public static Name = 'GetUsers';

	private users = new List(new UserInfo());
	private resultCodes = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.users.extractFrom(stream);
		this.resultCodes.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			users: this.users,
			resultCodes: this.resultCodes
		};
	}
}
