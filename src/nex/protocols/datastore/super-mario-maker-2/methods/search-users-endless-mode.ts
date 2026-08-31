import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import SearchUsersEndlessModeParam from '@/nex/protocols/datastore/super-mario-maker-2/types/search-users-endless-mode-param';
import UserInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/user-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchUsersEndlessMode';

	private param = new SearchUsersEndlessModeParam();

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
	public static Name = 'SearchUsersEndlessMode';

	private users = new List(new UserInfo());
	private unknown1 = new List(new UInt32());
	private unknown2 = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.users.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			users: this.users,
			unknown1: this.unknown1,
			unknown2: this.unknown2
		};
	}
}
