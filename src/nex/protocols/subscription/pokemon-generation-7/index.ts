import RMCMessage from '@/nex/rmc-message';
import SubscriptionProtocol from '@/nex/protocols/subscription';
import * as Methods from '@/nex/protocols/subscription/pokemon-generation-7/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class SubscriptionProtocolPokemonGeneration7 {
	static ID = 0x75;
	static Name = 'Subscription (Pokémon Generation 7)';

	static Methods = {
		UnknownMethod0xE: 0xE,
		UnknownMethod0xF: 0xF
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0xE: SubscriptionProtocolPokemonGeneration7.UnknownMethod0xE,
		0xF: SubscriptionProtocolPokemonGeneration7.UnknownMethod0xF
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = SubscriptionProtocolPokemonGeneration7.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			SubscriptionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UnknownMethod0xE(message: RMCMessage): typeof Methods.UnknownMethod0xE.Request | typeof Methods.UnknownMethod0xE.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0xE.Request;
		} else {
			return Methods.UnknownMethod0xE.Response;
		}
	}

	private static UnknownMethod0xF(message: RMCMessage): typeof Methods.UnknownMethod0xF.Request | typeof Methods.UnknownMethod0xF.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0xF.Request;
		} else {
			return Methods.UnknownMethod0xF.Response;
		}
	}
}
