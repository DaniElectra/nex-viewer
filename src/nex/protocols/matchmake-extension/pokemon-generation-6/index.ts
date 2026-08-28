import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/pokemon-generation-6/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolPokemonGeneration6 {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Pokémon Generation 6)';

	static Methods = {
		ClearMyPreviouslyMatchedUserCache: 0x22
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x22: MatchmakeExtensionProtocolPokemonGeneration6.ClearMyPreviouslyMatchedUserCache
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolPokemonGeneration6.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			MatchmakeExtensionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static ClearMyPreviouslyMatchedUserCache(message: RMCMessage): typeof Methods.ClearMyPreviouslyMatchedUserCache.Request | typeof Methods.ClearMyPreviouslyMatchedUserCache.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ClearMyPreviouslyMatchedUserCache.Request;
		} else {
			return Methods.ClearMyPreviouslyMatchedUserCache.Response;
		}
	}
}
