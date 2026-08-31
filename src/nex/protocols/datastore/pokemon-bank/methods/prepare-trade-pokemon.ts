import NEXByteStream from '@/nex/byte-stream';
import GlobalTradeStationPrepareTradePokemonParam from '@/nex/protocols/datastore/pokemon-bank/types/global-trade-station-prepare-trade-pokemon-param';
import GlobalTradeStationPrepareTradePokemonResult from '@/nex/protocols/datastore/pokemon-bank/types/global-trade-station-prepare-trade-pokemon-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'PrepareTradePokemon';

	private param = new GlobalTradeStationPrepareTradePokemonParam();

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
	public static Name = 'PrepareTradePokemon';

	private pResult = new GlobalTradeStationPrepareTradePokemonResult();

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
