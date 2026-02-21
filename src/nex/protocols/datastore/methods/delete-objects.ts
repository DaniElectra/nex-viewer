import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Bool from '@/nex/types/bool';
import QResult from '@/nex/types/qresult';
import DataStoreDeleteParam from '@/nex/protocols/datastore/types/datastore-delete-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeleteObjects';

	private params = new List(new DataStoreDeleteParam());
	private transactional = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.params.extractFrom(stream);
		this.transactional.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			params: this.params,
			transactional: this.transactional
		};
	}
}

export class Response {
	public static Name = 'DeleteObjects';

	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResults: this.pResults
		};
	}
}
