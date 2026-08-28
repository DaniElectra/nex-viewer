import RMCMessage from '@/nex/rmc-message';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import * as Methods from '@/nex/protocols/matchmake-extension/pokemon-generation-7/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class MatchmakeExtensionProtocolPokemonGeneration7 {
	static ID = 0x6D;
	static Name = 'MatchmakeExtension (Pokémon Generation 7)';

	static Methods = {
		ClearMyPreviouslyMatchedUserCache: 0x30,
		GetAttractionStatus: 0x31,
		GetAttractionStatusWithGroupId: 0x32,
		SimpleMatchmake: 0x33,
		EntrySimpleMatchmake: 0x34,
		CancelSimpleMatchmakeEntry: 0x35
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x30: MatchmakeExtensionProtocolPokemonGeneration7.ClearMyPreviouslyMatchedUserCache,
		0x31: MatchmakeExtensionProtocolPokemonGeneration7.GetAttractionStatus,
		0x32: MatchmakeExtensionProtocolPokemonGeneration7.GetAttractionStatusWithGroupId,
		0x33: MatchmakeExtensionProtocolPokemonGeneration7.SimpleMatchmake,
		0x34: MatchmakeExtensionProtocolPokemonGeneration7.EntrySimpleMatchmake,
		0x35: MatchmakeExtensionProtocolPokemonGeneration7.CancelSimpleMatchmakeEntry
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchmakeExtensionProtocolPokemonGeneration7.handlers[methodID];

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

	private static GetAttractionStatus(message: RMCMessage): typeof Methods.GetAttractionStatus.Request | typeof Methods.GetAttractionStatus.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetAttractionStatus.Request;
		} else {
			return Methods.GetAttractionStatus.Response;
		}
	}

	private static GetAttractionStatusWithGroupId(message: RMCMessage): typeof Methods.GetAttractionStatusWithGroupId.Request | typeof Methods.GetAttractionStatusWithGroupId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetAttractionStatusWithGroupId.Request;
		} else {
			return Methods.GetAttractionStatusWithGroupId.Response;
		}
	}

	private static SimpleMatchmake(message: RMCMessage): typeof Methods.SimpleMatchmake.Request | typeof Methods.SimpleMatchmake.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SimpleMatchmake.Request;
		} else {
			return Methods.SimpleMatchmake.Response;
		}
	}

	private static EntrySimpleMatchmake(message: RMCMessage): typeof Methods.EntrySimpleMatchmake.Request | typeof Methods.EntrySimpleMatchmake.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EntrySimpleMatchmake.Request;
		} else {
			return Methods.EntrySimpleMatchmake.Response;
		}
	}

	private static CancelSimpleMatchmakeEntry(message: RMCMessage): typeof Methods.CancelSimpleMatchmakeEntry.Request | typeof Methods.CancelSimpleMatchmakeEntry.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CancelSimpleMatchmakeEntry.Request;
		} else {
			return Methods.CancelSimpleMatchmakeEntry.Response;
		}
	}
}
