import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import DataStorePasswordInfo from '@/nex/protocols/datastore/types/datastore-password-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPasswordInfo';

	private dataId = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataId.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataId: this.dataId
		};
	}
}

export class Response {
	public static Name = 'GetPasswordInfo';

	private pPasswordInfo = new DataStorePasswordInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pPasswordInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pPasswordInfo: this.pPasswordInfo
		};
	}
}
