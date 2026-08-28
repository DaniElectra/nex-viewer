import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import Bool from '@/nex/types/bool';
import DataStoreGetMetaByUniqueIdParam from '@/nex/protocols/datastore/animal-crossing-happy-home-designer/types/datastore-get-meta-by-unique-id-param';
import DataStoreMetaInfo from '@/nex/protocols/datastore/types/datastore-meta-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetMetaByUniqueId';

	private param = new DataStoreGetMetaByUniqueIdParam();

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
	public static Name = 'GetMetaByUniqueId';

	private pMetaInfo = new List(new DataStoreMetaInfo());
	private pHasNext = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pMetaInfo.extractFrom(stream);
		this.pHasNext.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pMetaInfo: this.pMetaInfo,
			pHasNext: this.pHasNext
		};
	}
}
