import NEXByteStream from '@/nex/byte-stream';
import GlobalTradeStationUploadPokemonParam from '@/nex/protocols/datastore/pokemon-generation-6/types/global-trade-station-upload-pokemon-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UploadPokemon';

	private param = new GlobalTradeStationUploadPokemonParam();

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

// * No response data
export class Response {
	public static Name = 'UploadPokemon';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
