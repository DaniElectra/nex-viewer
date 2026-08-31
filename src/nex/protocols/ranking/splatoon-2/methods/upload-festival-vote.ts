import NEXByteStream from '@/nex/byte-stream';
import FestivalUploadVoteParam from '@/nex/protocols/ranking/splatoon-2/types/festival-upload-vote-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadFestivalVote';

	private uploadParam = new FestivalUploadVoteParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.uploadParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uploadParam: this.uploadParam
		};
	}
}

// * No response data
export class Response {
	public static Name = 'UploadFestivalVote';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
