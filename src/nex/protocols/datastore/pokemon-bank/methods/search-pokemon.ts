import NEXByteStream from '@/nex/byte-stream';
import GlobalTradeStationSearchPokemonParam from '@/nex/protocols/datastore/pokemon-bank/types/global-trade-station-search-pokemon-param';
import GlobalTradeStationSearchPokemonResult from '@/nex/protocols/datastore/pokemon-bank/types/global-trade-station-search-pokemon-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchPokemon';

	private param = new GlobalTradeStationSearchPokemonParam();

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
	public static Name = 'SearchPokemon';

	private pResult = new GlobalTradeStationSearchPokemonResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pResult.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pResult: this.pResult
		};
	}
}
