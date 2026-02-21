import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt64 from '@/nex/types/uint64';
import QResult from '@/nex/types/qresult';
import DataStorePasswordInfo from '@/nex/protocols/datastore/types/datastore-password-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetPasswordInfos';

	private dataIds = new List(new UInt64());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataIds.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataIds: this.dataIds
		};
	}
}

export class Response {
	public static Name = 'GetPasswordInfos';

	private pPasswordInfos = new List(new DataStorePasswordInfo());
	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pPasswordInfos.extractFrom(stream);
		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pPasswordInfos: this.pPasswordInfos,
			pResults: this.pResults
		};
	}
}
