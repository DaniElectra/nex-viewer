import NEXByteStream from '@/nex/byte-stream';
import DataStoreGetMetaParam from '@/nex/protocols/datastore/types/datastore-get-meta-param';
import DataStoreMetaInfo from '@/nex/protocols/datastore/types/datastore-meta-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetMeta';

	private param = new DataStoreGetMetaParam();

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
	public static Name = 'GetMeta';

	private pMetaInfo = new DataStoreMetaInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pMetaInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pMetaInfo: this.pMetaInfo
		};
	}
}
