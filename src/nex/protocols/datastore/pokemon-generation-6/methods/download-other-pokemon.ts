import NEXByteStream from '@/nex/byte-stream';
import GlobalTradeStationDownloadOtherPokemonParam from '@/nex/protocols/datastore/pokemon-generation-6/types/global-trade-station-download-other-pokemon-param';
import GlobalTradeStationTradePokemonResult from '@/nex/protocols/datastore/pokemon-generation-6/types/global-trade-station-trade-pokemon-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DownloadOtherPokemon';

	private param = new GlobalTradeStationDownloadOtherPokemonParam();

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
	public static Name = 'DownloadOtherPokemon';

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
