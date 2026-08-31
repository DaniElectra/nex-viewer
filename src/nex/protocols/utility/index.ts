import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/utility/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class UtilityProtocol {
	static ID = 0x6E;
	static Name = 'Utility';

	static Methods = {
		AcquireNexUniqueId: 0x1,
		AcquireNexUniqueIdWithPassword: 0x2,
		AssociateNexUniqueIdWithMyPrincipalId: 0x3,
		AssociateNexUniqueIdsWithMyPrincipalId: 0x4,
		GetAssociatedNexUniqueIdWithMyPrincipalId: 0x5,
		GetAssociatedNexUniqueIdsWithMyPrincipalId: 0x6,
		GetIntegerSettings: 0x7,
		GetStringSettings: 0x8
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: UtilityProtocol.AcquireNexUniqueId,
		0x2: UtilityProtocol.AcquireNexUniqueIdWithPassword,
		0x3: UtilityProtocol.AssociateNexUniqueIdWithMyPrincipalId,
		0x4: UtilityProtocol.AssociateNexUniqueIdsWithMyPrincipalId,
		0x5: UtilityProtocol.GetAssociatedNexUniqueIdWithMyPrincipalId,
		0x6: UtilityProtocol.GetAssociatedNexUniqueIdsWithMyPrincipalId,
		0x7: UtilityProtocol.GetIntegerSettings,
		0x8: UtilityProtocol.GetStringSettings
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = UtilityProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static AcquireNexUniqueId(message: RMCMessage): typeof Methods.AcquireNexUniqueId.Request | typeof Methods.AcquireNexUniqueId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcquireNexUniqueId.Request;
		} else {
			return Methods.AcquireNexUniqueId.Response;
		}
	}

	private static AcquireNexUniqueIdWithPassword(message: RMCMessage): typeof Methods.AcquireNexUniqueIdWithPassword.Request | typeof Methods.AcquireNexUniqueIdWithPassword.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcquireNexUniqueIdWithPassword.Request;
		} else {
			return Methods.AcquireNexUniqueIdWithPassword.Response;
		}
	}

	private static AssociateNexUniqueIdWithMyPrincipalId(message: RMCMessage): typeof Methods.AssociateNexUniqueIdWithMyPrincipalId.Request | typeof Methods.AssociateNexUniqueIdWithMyPrincipalId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AssociateNexUniqueIdWithMyPrincipalId.Request;
		} else {
			return Methods.AssociateNexUniqueIdWithMyPrincipalId.Response;
		}
	}

	private static AssociateNexUniqueIdsWithMyPrincipalId(message: RMCMessage): typeof Methods.AssociateNexUniqueIdsWithMyPrincipalId.Request | typeof Methods.AssociateNexUniqueIdsWithMyPrincipalId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AssociateNexUniqueIdsWithMyPrincipalId.Request;
		} else {
			return Methods.AssociateNexUniqueIdsWithMyPrincipalId.Response;
		}
	}

	private static GetAssociatedNexUniqueIdWithMyPrincipalId(message: RMCMessage): typeof Methods.GetAssociatedNexUniqueIdWithMyPrincipalId.Request | typeof Methods.GetAssociatedNexUniqueIdWithMyPrincipalId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetAssociatedNexUniqueIdWithMyPrincipalId.Request;
		} else {
			return Methods.GetAssociatedNexUniqueIdWithMyPrincipalId.Response;
		}
	}

	private static GetAssociatedNexUniqueIdsWithMyPrincipalId(message: RMCMessage): typeof Methods.GetAssociatedNexUniqueIdsWithMyPrincipalId.Request | typeof Methods.GetAssociatedNexUniqueIdsWithMyPrincipalId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetAssociatedNexUniqueIdsWithMyPrincipalId.Request;
		} else {
			return Methods.GetAssociatedNexUniqueIdsWithMyPrincipalId.Response;
		}
	}

	private static GetIntegerSettings(message: RMCMessage): typeof Methods.GetIntegerSettings.Request | typeof Methods.GetIntegerSettings.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetIntegerSettings.Request;
		} else {
			return Methods.GetIntegerSettings.Response;
		}
	}

	private static GetStringSettings(message: RMCMessage): typeof Methods.GetStringSettings.Request | typeof Methods.GetStringSettings.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetStringSettings.Request;
		} else {
			return Methods.GetStringSettings.Response;
		}
	}
}
