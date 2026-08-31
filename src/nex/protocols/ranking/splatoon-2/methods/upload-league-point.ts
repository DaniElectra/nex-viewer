import NEXByteStream from '@/nex/byte-stream';
import LeaguePointInfo from '@/nex/protocols/ranking/splatoon-2/types/league-point-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadLeaguePoint';

	private info = new LeaguePointInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.info.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			info: this.info
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UploadLeaguePoint';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
