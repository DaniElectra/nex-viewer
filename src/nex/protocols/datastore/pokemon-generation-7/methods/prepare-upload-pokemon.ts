import NEXByteStream from '@/nex/byte-stream';
import GlobalTradeStationRecordKey from '@/nex/protocols/datastore/pokemon-generation-7/types/global-trade-station-record-key';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'PrepareUploadPokemon';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'PrepareUploadPokemon';

	private pRecordKey = new GlobalTradeStationRecordKey();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pRecordKey.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pRecordKey: this.pRecordKey
		};
	}
}
