import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/pokemon-generation-6/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolPokemonGeneration6 {
	static ID = 0x73;
	static Name = 'DataStore (Pokémon Generation 6)';

	static Methods = {
		PrepareUploadPokemon: 0x28,
		UploadPokemon: 0x29,
		SearchPokemon: 0x2A,
		PrepareTradePokemon: 0x2B,
		TradePokemon: 0x2C,
		DownloadOtherPokemon: 0x2D,
		DownloadMyPokemon: 0x2E,
		DeletePokemon: 0x2F,
		GetObjectInfos: 0x30
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x28: DataStoreProtocolPokemonGeneration6.PrepareUploadPokemon,
		0x29: DataStoreProtocolPokemonGeneration6.UploadPokemon,
		0x2A: DataStoreProtocolPokemonGeneration6.SearchPokemon,
		0x2B: DataStoreProtocolPokemonGeneration6.PrepareTradePokemon,
		0x2C: DataStoreProtocolPokemonGeneration6.TradePokemon,
		0x2D: DataStoreProtocolPokemonGeneration6.DownloadOtherPokemon,
		0x2E: DataStoreProtocolPokemonGeneration6.DownloadMyPokemon,
		0x2F: DataStoreProtocolPokemonGeneration6.DeletePokemon,
		0x30: DataStoreProtocolPokemonGeneration6.GetObjectInfos
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolPokemonGeneration6.handlers[methodID];

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

	private static GetObjectInfos(message: RMCMessage): typeof Methods.GetObjectInfos.Request | typeof Methods.GetObjectInfos.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetObjectInfos.Request;
		} else {
			return Methods.GetObjectInfos.Response;
		}
	}
}
