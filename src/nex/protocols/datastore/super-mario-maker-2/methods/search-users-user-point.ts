import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import SearchUsersUserPointParam from '@/nex/protocols/datastore/super-mario-maker-2/types/search-users-user-point-param';
import UserInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/user-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchUsersUserPoint';

	private param = new SearchUsersUserPointParam();

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
	public static Name = 'SearchUsersUserPoint';

	private users = new List(new UserInfo());
	private ranks = new List(new UInt32());
	private result = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.users.extractFrom(stream);
		this.ranks.extractFrom(stream);
		this.result.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			users: this.users,
			ranks: this.ranks,
			result: this.result
		};
	}
}
