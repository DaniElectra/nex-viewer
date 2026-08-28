import NEXByteStream from '@/nex/byte-stream';
import DataStoreGetSharedDataMetaParam from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-get-shared-data-meta-param';
import DataStoreSharedDataInfo from '@/nex/protocols/datastore/super-smash-bros-4/types/datastore-shared-data-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetSharedDataMeta';

	private param = new DataStoreGetSharedDataMetaParam();

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
	public static Name = 'GetSharedDataMeta';

	private pSharedDataInfo = new DataStoreSharedDataInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pSharedDataInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pSharedDataInfo: this.pSharedDataInfo
		};
	}
}
