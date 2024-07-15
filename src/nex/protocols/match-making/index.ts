import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/match-making/methods';
import type Packet from '@/types/nex/packet';

export default class MatchMakingProtocol {
	static ID = 0x15;
	static Name = 'MatchMaking';

	static Methods = {
		RegisterGathering: 0x1,
		UnregisterGathering: 0x2,
		UnregisterGatherings: 0x3,
		UpdateGathering: 0x4,
		Invite: 0x5,
		AcceptInvitation: 0x6,
		DeclineInvitation: 0x7,
		CancelInvitation: 0x8,
		GetInvitationsSent: 0x9,
		GetInvitationsReceived: 0xA,
		Participate: 0xB,
		CancelParticipation: 0xC,
		GetParticipants: 0xD,
		AddParticipants: 0xE,
		GetDetailedParticipants: 0xF,
		GetParticipantsURLs: 0x10,
		FindByType: 0x11,
		FindByDescription: 0x12,
		FindByDescriptionRegex: 0x13,
		FindByID: 0x14,
		FindBySingleID: 0x15,
		FindByOwner: 0x16,
		FindByParticipants: 0x17,
		FindInvitations: 0x18,
		FindBySQLQuery: 0x19,
		LaunchSession: 0x1A,
		UpdateSessionURL: 0x1B,
		GetSessionURL: 0x1C,
		GetState: 0x1D,
		SetState: 0x1E,
		ReportStats: 0x1F,
		GetStats: 0x20,
		DeleteGathering: 0x21,
		GetPendingDeletions: 0x22,
		DeleteFromDeletions: 0x23,
		MigrateGatheringOwnershipV1: 0x24,
		FindByDescriptionLike: 0x25,
		RegisterLocalURL: 0x26,
		RegisterLocalURLs: 0x27,
		UpdateSessionHostV1: 0x28,
		GetSessionURLs: 0x29,
		UpdateSessionHost: 0x2A,
		UpdateGatheringOwnership: 0x2B,
		MigrateGatheringOwnership: 0x2C
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x29: MatchMakingProtocol.GetSessionURLs,
		0x2A: MatchMakingProtocol.UpdateSessionHost
	};

	static handlePacket(packet: Packet): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = MatchMakingProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.parameters = new messageDecoder(packet.message);
		packet.message.methodName = messageDecoder.Name;
	}

	private static GetSessionURLs(message: RMCMessage): typeof Methods.GetSessionURLs.Request | typeof Methods.GetSessionURLs.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSessionURLs.Request;
		} else {
			return Methods.GetSessionURLs.Response;
		}
	}

	private static UpdateSessionHost(message: RMCMessage): typeof Methods.UpdateSessionHost.Request | typeof Methods.UpdateSessionHost.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateSessionHost.Request;
		} else {
			return Methods.UpdateSessionHost.Response;
		}
	}
}