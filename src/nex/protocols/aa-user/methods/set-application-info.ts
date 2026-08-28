import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import ApplicationInfo from '@/nex/protocols/aa-user/types/application-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SetApplicationInfo';

	private applicationInfo = new List(new ApplicationInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.applicationInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			applicationInfo: this.applicationInfo
		};
	}
}

// * No response data
export class Response {
	public static Name = 'SetApplicationInfo';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
