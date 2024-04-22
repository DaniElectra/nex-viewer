import RMCMessage from '@/nex/rmc-message';
import TicketGrantingProtocol from '@/nex/protocols/ticket-granting';
import SecureConnectionProtocol from '@/nex/protocols/secure-connection';
import type ServiceProtocol from '@/types/nex/service-protocol';

export default function getProtocol(message: RMCMessage): ServiceProtocol | null {
	const protocolID = message.protocolID === 0x7F ? message.extendedProtocolID : message.protocolID;

	switch (protocolID) {
		case TicketGrantingProtocol.ID:
			return TicketGrantingProtocol;
		case SecureConnectionProtocol.ID:
			return SecureConnectionProtocol;

		default:
			return null;
	}
}