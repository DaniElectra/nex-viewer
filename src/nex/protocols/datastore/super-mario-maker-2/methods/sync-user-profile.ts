import NEXByteStream from '@/nex/byte-stream';
import SyncUserProfileParam from '@/nex/protocols/datastore/super-mario-maker-2/types/sync-user-profile-param';
import SyncUserProfileResult from '@/nex/protocols/datastore/super-mario-maker-2/types/sync-user-profile-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SyncUserProfile';

	private param = new SyncUserProfileParam();

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
	public static Name = 'SyncUserProfile';

	private result = new SyncUserProfileResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.result.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			result: this.result
		};
	}
}
