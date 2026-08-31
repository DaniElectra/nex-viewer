import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import DataStoreGetSpecificMetaParamV1 from '@/nex/protocols/datastore/types/datastore-get-specific-meta-param-v1';
import DataStoreSpecificMetaInfoV1 from '@/nex/protocols/datastore/types/datastore-specific-meta-info-v1';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetSpecificMetaV1';

	private param = new DataStoreGetSpecificMetaParamV1();

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
	public static Name = 'GetSpecificMetaV1';

	private pMetaInfos = new List(new DataStoreSpecificMetaInfoV1());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pMetaInfos.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pMetaInfos: this.pMetaInfos
		};
	}
}
