import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import DataStoreGetSpecificMetaParam from '@/nex/protocols/datastore/types/datastore-get-specific-meta-param';
import DataStoreSpecificMetaInfo from '@/nex/protocols/datastore/types/datastore-specific-meta-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetSpecificMeta';

	private param = new DataStoreGetSpecificMetaParam();

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
	public static Name = 'GetSpecificMeta';

	private pMetaInfos = new List(new DataStoreSpecificMetaInfo());

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
