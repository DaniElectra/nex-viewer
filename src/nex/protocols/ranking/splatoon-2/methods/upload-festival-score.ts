import NEXByteStream from '@/nex/byte-stream';
import FestivalUploadScoreParam from '@/nex/protocols/ranking/splatoon-2/types/festival-upload-score-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadFestivalScore';

	private uploadParam = new FestivalUploadScoreParam();

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
	public static Name = 'UploadFestivalScore';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
