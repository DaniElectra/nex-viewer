import NATTraversalProtocol from '@/nex/protocols/nat-traversal';
import TicketGrantingProtocol from '@/nex/protocols/ticket-granting';
import SecureConnectionProtocol from '@/nex/protocols/secure-connection';
import NotificationEventsProtocol from '@/nex/protocols/notification-events';
import MatchMakingProtocol from '@/nex/protocols/match-making';
import MatchMakingExtProtocol from '@/nex/protocols/match-making-ext';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import MatchmakeRefereeProtocol from '@/nex/protocols/matchmake-referee';
import type RMCMessage from '@/nex/rmc-message';
import type ServiceProtocol from '@/types/nex/service-protocol';

export default function getProtocol(message: RMCMessage): ServiceProtocol | null {
	const protocolID = message.protocolID === 0x7F ? message.extendedProtocolID : message.protocolID;

	switch (protocolID) {
		case NATTraversalProtocol.ID:
			return NATTraversalProtocol;
		case TicketGrantingProtocol.ID:
			return TicketGrantingProtocol;
		case SecureConnectionProtocol.ID:
			return SecureConnectionProtocol;
		case NotificationEventsProtocol.ID:
			return NotificationEventsProtocol;
		case MatchMakingProtocol.ID:
			return MatchMakingProtocol;
		case MatchMakingExtProtocol.ID:
			return MatchMakingExtProtocol;
		case MatchmakeExtensionProtocol.ID:
			return MatchmakeExtensionProtocol;
		case MatchmakeRefereeProtocol.ID:
			return MatchmakeRefereeProtocol;
	}

	return null;
}