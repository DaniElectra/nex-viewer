import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import OLSCompetitionInfos from '@/nex/protocols/ols-storage/rayman-legends-challenges-app/types/ols-competition-infos';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'QueryCompetitionsInfos';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'QueryCompetitionsInfos';

	private infos = new List(new OLSCompetitionInfos());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.infos.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			infos: this.infos
		};
	}
}
