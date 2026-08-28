import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/pokemon-generation-7/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolPokemonGeneration7 {
	static ID = 0x73;
	static Name = 'DataStore (Pokémon Generation 7)';

	static Methods = {
		PrepareUploadPokemon: 0x2F,
		UploadPokemon: 0x30,
		SearchPokemon: 0x31,
		PrepareTradePokemon: 0x32,
		TradePokemon: 0x33,
		DownloadOtherPokemon: 0x34,
		DownloadMyPokemon: 0x35,
		DeletePokemon: 0x36,
		SearchPokemonV2: 0x37
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2F: DataStoreProtocolPokemonGeneration7.PrepareUploadPokemon,
		0x30: DataStoreProtocolPokemonGeneration7.UploadPokemon,
		0x31: DataStoreProtocolPokemonGeneration7.SearchPokemon,
		0x32: DataStoreProtocolPokemonGeneration7.PrepareTradePokemon,
		0x33: DataStoreProtocolPokemonGeneration7.TradePokemon,
		0x34: DataStoreProtocolPokemonGeneration7.DownloadOtherPokemon,
		0x35: DataStoreProtocolPokemonGeneration7.DownloadMyPokemon,
		0x36: DataStoreProtocolPokemonGeneration7.DeletePokemon,
		0x37: DataStoreProtocolPokemonGeneration7.SearchPokemonV2
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolPokemonGeneration7.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static PrepareUploadPokemon(message: RMCMessage): typeof Methods.PrepareUploadPokemon.Request | typeof Methods.PrepareUploadPokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareUploadPokemon.Request;
		} else {
			return Methods.PrepareUploadPokemon.Response;
		}
	}

	private static UploadPokemon(message: RMCMessage): typeof Methods.UploadPokemon.Request | typeof Methods.UploadPokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadPokemon.Request;
		} else {
			return Methods.UploadPokemon.Response;
		}
	}

	private static SearchPokemon(message: RMCMessage): typeof Methods.SearchPokemon.Request | typeof Methods.SearchPokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchPokemon.Request;
		} else {
			return Methods.SearchPokemon.Response;
		}
	}

	private static PrepareTradePokemon(message: RMCMessage): typeof Methods.PrepareTradePokemon.Request | typeof Methods.PrepareTradePokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrepareTradePokemon.Request;
		} else {
			return Methods.PrepareTradePokemon.Response;
		}
	}

	private static TradePokemon(message: RMCMessage): typeof Methods.TradePokemon.Request | typeof Methods.TradePokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.TradePokemon.Request;
		} else {
			return Methods.TradePokemon.Response;
		}
	}

	private static DownloadOtherPokemon(message: RMCMessage): typeof Methods.DownloadOtherPokemon.Request | typeof Methods.DownloadOtherPokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DownloadOtherPokemon.Request;
		} else {
			return Methods.DownloadOtherPokemon.Response;
		}
	}

	private static DownloadMyPokemon(message: RMCMessage): typeof Methods.DownloadMyPokemon.Request | typeof Methods.DownloadMyPokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DownloadMyPokemon.Request;
		} else {
			return Methods.DownloadMyPokemon.Response;
		}
	}

	private static DeletePokemon(message: RMCMessage): typeof Methods.DeletePokemon.Request | typeof Methods.DeletePokemon.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeletePokemon.Request;
		} else {
			return Methods.DeletePokemon.Response;
		}
	}

	private static SearchPokemonV2(message: RMCMessage): typeof Methods.SearchPokemonV2.Request | typeof Methods.SearchPokemonV2.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SearchPokemonV2.Request;
		} else {
			return Methods.SearchPokemonV2.Response;
		}
	}
}
