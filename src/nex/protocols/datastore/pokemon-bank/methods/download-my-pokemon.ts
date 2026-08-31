import NEXByteStream from '@/nex/byte-stream';
import GlobalTradeStationDownloadMyPokemonParam from '@/nex/protocols/datastore/pokemon-bank/types/global-trade-station-download-my-pokemon-param';
import GlobalTradeStationDownloadMyPokemonResult from '@/nex/protocols/datastore/pokemon-bank/types/global-trade-station-download-my-pokemon-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'DownloadMyPokemon';

	private param = new GlobalTradeStationDownloadMyPokemonParam();

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
	public static Name = 'DownloadMyPokemon';

	private pResult = new GlobalTradeStationDownloadMyPokemonResult();

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
