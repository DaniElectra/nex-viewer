import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import DataStoreProfileInfo from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-profile-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetProfiles';

	private pidList = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pidList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pidList: this.pidList
		};
	}
}

export class Response {
	public static Name = 'GetProfiles';

	private pProfileList = new List(new DataStoreProfileInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pProfileList.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pProfileList: this.pProfileList
		};
	}
}
