import NEXByteStream from '@/nex/byte-stream';
import GlobalTradeStationTradePokemonParam from '@/nex/protocols/datastore/pokemon-generation-6/types/global-trade-station-trade-pokemon-param';
import GlobalTradeStationTradePokemonResult from '@/nex/protocols/datastore/pokemon-generation-6/types/global-trade-station-trade-pokemon-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'TradePokemon';

	private param = new GlobalTradeStationTradePokemonParam();

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
	public static Name = 'TradePokemon';

	private pResult = new GlobalTradeStationTradePokemonResult();

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
