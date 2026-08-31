import NEXByteStream from '@/nex/byte-stream';
import GlobalTradeStationDeletePokemonParam from '@/nex/protocols/datastore/pokemon-generation-7/types/global-trade-station-delete-pokemon-param';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DeletePokemon';

	private param = new GlobalTradeStationDeletePokemonParam();

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
	public static Name = 'DeletePokemon';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}
