import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/shop/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class ShopProtocol {
	static ID = 0xC8;
	static Name = 'Shop';

	static Methods = {
		GetItems: 0x1,
		GetChallengeBlob: 0x2,
		GetRivToken: 0x3,
		GetRivTokenByItemId: 0x4,
		GetItemRights: 0x5,
		VerifyAndRegisterTicket: 0x6,
		DebugSetExpireTime: 0x7,
		PrincipalIDToSupportNumber: 0x8,
		SupportNumberToPrincipalID: 0x9,
		GetGameServerTime: 0xA
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: ShopProtocol.GetItems,
		0x2: ShopProtocol.GetChallengeBlob,
		0x3: ShopProtocol.GetRivToken,
		0x4: ShopProtocol.GetRivTokenByItemId,
		0x5: ShopProtocol.GetItemRights,
		0x6: ShopProtocol.VerifyAndRegisterTicket,
		0x7: ShopProtocol.DebugSetExpireTime,
		0x8: ShopProtocol.PrincipalIDToSupportNumber,
		0x9: ShopProtocol.SupportNumberToPrincipalID,
		0xA: ShopProtocol.GetGameServerTime
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = ShopProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetItems(message: RMCMessage): typeof Methods.GetItems.Request | typeof Methods.GetItems.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetItems.Request;
		} else {
			return Methods.GetItems.Response;
		}
	}

	private static GetChallengeBlob(message: RMCMessage): typeof Methods.GetChallengeBlob.Request | typeof Methods.GetChallengeBlob.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetChallengeBlob.Request;
		} else {
			return Methods.GetChallengeBlob.Response;
		}
	}

	private static GetRivToken(message: RMCMessage): typeof Methods.GetRivToken.Request | typeof Methods.GetRivToken.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRivToken.Request;
		} else {
			return Methods.GetRivToken.Response;
		}
	}

	private static GetRivTokenByItemId(message: RMCMessage): typeof Methods.GetRivTokenByItemId.Request | typeof Methods.GetRivTokenByItemId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRivTokenByItemId.Request;
		} else {
			return Methods.GetRivTokenByItemId.Response;
		}
	}

	private static GetItemRights(message: RMCMessage): typeof Methods.GetItemRights.Request | typeof Methods.GetItemRights.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetItemRights.Request;
		} else {
			return Methods.GetItemRights.Response;
		}
	}

	private static VerifyAndRegisterTicket(message: RMCMessage): typeof Methods.VerifyAndRegisterTicket.Request | typeof Methods.VerifyAndRegisterTicket.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.VerifyAndRegisterTicket.Request;
		} else {
			return Methods.VerifyAndRegisterTicket.Response;
		}
	}

	private static DebugSetExpireTime(message: RMCMessage): typeof Methods.DebugSetExpireTime.Request | typeof Methods.DebugSetExpireTime.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DebugSetExpireTime.Request;
		} else {
			return Methods.DebugSetExpireTime.Response;
		}
	}

	private static PrincipalIDToSupportNumber(message: RMCMessage): typeof Methods.PrincipalIDToSupportNumber.Request | typeof Methods.PrincipalIDToSupportNumber.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PrincipalIDToSupportNumber.Request;
		} else {
			return Methods.PrincipalIDToSupportNumber.Response;
		}
	}

	private static SupportNumberToPrincipalID(message: RMCMessage): typeof Methods.SupportNumberToPrincipalID.Request | typeof Methods.SupportNumberToPrincipalID.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SupportNumberToPrincipalID.Request;
		} else {
			return Methods.SupportNumberToPrincipalID.Response;
		}
	}

	private static GetGameServerTime(message: RMCMessage): typeof Methods.GetGameServerTime.Request | typeof Methods.GetGameServerTime.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetGameServerTime.Request;
		} else {
			return Methods.GetGameServerTime.Response;
		}
	}
}
