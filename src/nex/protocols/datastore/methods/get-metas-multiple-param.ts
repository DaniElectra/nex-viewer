import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import QResult from '@/nex/types/qresult';
import DataStoreGetMetaParam from '@/nex/protocols/datastore/types/datastore-get-meta-param';
import DataStoreMetaInfo from '@/nex/protocols/datastore/types/datastore-meta-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetMetasMultipleParam';

	private params = new List(new DataStoreGetMetaParam());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.params.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			params: this.params
		};
	}
}

export class Response {
	public static Name = 'GetMetasMultipleParam';

	private pMetaInfo = new List(new DataStoreMetaInfo());
	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pMetaInfo.extractFrom(stream);
		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pMetaInfo: this.pMetaInfo,
			pResults: this.pResults
		};
	}
}
