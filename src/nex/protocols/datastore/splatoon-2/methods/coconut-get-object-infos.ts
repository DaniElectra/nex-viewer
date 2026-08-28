import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import QResult from '@/nex/types/qresult';
import CoconutGetParam from '@/nex/protocols/datastore/splatoon-2/types/coconut-get-param';
import CoconutGetInfo from '@/nex/protocols/datastore/splatoon-2/types/coconut-get-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'CoconutGetObjectInfos';

	private param = new CoconutGetParam();

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
	public static Name = 'CoconutGetObjectInfos';

	private pInfos = new List(new CoconutGetInfo());
	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pInfos.extractFrom(stream);
		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pInfos: this.pInfos,
			pResults: this.pResults
		};
	}
}
