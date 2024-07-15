import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/match-making-ext/methods';
import type Packet from '@/types/nex/packet';

export default class MatchMakingExtProtocol {
	static ID = 0x32;
	static Name = 'MatchMakingExt';

	static Methods = {
		EndParticipation: 0x1,
		GetParticipants: 0x2,
		GetDetailedParticipants: 0x3,
		GetParticipantsURLs: 0x4,
		GetGatheringRelations: 0x5,
		DeleteFromDeletions: 0x6
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: MatchMakingExtProtocol.EndParticipation
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchMakingExtProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static EndParticipation(message: RMCMessage): typeof Methods.EndParticipation.Request | typeof Methods.EndParticipation.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EndParticipation.Request;
		} else {
			return Methods.EndParticipation.Response;
		}
	}
}