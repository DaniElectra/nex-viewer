import RMCMessage from '@/nex/rmc-message';
import SubscriptionProtocol from '@/nex/protocols/subscription';
import * as Methods from '@/nex/protocols/subscription/xenoblade-chronicles-x/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class SubscriptionProtocolXenobladeChroniclesX {
	static ID = 0x75;
	static Name = 'Subscription (Xenoblade Chronicles X)';

	static Methods = {
		GetSubscriptionUserFriendList: 0x0E,
		GetPrivacyLevels: 0x0F,
		CreateMySubscriptionDataWithNotificationParams: 0x10,
		UpdateMySubscriptionDataWithNotificationParams: 0x11,
		ClearMySubscriptionDataWithNotificationParams: 0x12
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x0E: SubscriptionProtocolXenobladeChroniclesX.GetSubscriptionUserFriendList,
		0x0F: SubscriptionProtocolXenobladeChroniclesX.GetPrivacyLevels,
		0x10: SubscriptionProtocolXenobladeChroniclesX.CreateMySubscriptionDataWithNotificationParams,
		0x11: SubscriptionProtocolXenobladeChroniclesX.UpdateMySubscriptionDataWithNotificationParams,
		0x12: SubscriptionProtocolXenobladeChroniclesX.ClearMySubscriptionDataWithNotificationParams
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = SubscriptionProtocolXenobladeChroniclesX.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			SubscriptionProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetSubscriptionUserFriendList(message: RMCMessage): typeof Methods.GetSubscriptionUserFriendList.Request | typeof Methods.GetSubscriptionUserFriendList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSubscriptionUserFriendList.Request;
		} else {
			return Methods.GetSubscriptionUserFriendList.Response;
		}
	}

	private static GetPrivacyLevels(message: RMCMessage): typeof Methods.GetPrivacyLevels.Request | typeof Methods.GetPrivacyLevels.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPrivacyLevels.Request;
		} else {
			return Methods.GetPrivacyLevels.Response;
		}
	}

	private static CreateMySubscriptionDataWithNotificationParams(message: RMCMessage): typeof Methods.CreateMySubscriptionDataWithNotificationParams.Request | typeof Methods.CreateMySubscriptionDataWithNotificationParams.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.CreateMySubscriptionDataWithNotificationParams.Request;
		} else {
			return Methods.CreateMySubscriptionDataWithNotificationParams.Response;
		}
	}

	private static UpdateMySubscriptionDataWithNotificationParams(message: RMCMessage): typeof Methods.UpdateMySubscriptionDataWithNotificationParams.Request | typeof Methods.UpdateMySubscriptionDataWithNotificationParams.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateMySubscriptionDataWithNotificationParams.Request;
		} else {
			return Methods.UpdateMySubscriptionDataWithNotificationParams.Response;
		}
	}

	private static ClearMySubscriptionDataWithNotificationParams(message: RMCMessage): typeof Methods.ClearMySubscriptionDataWithNotificationParams.Request | typeof Methods.ClearMySubscriptionDataWithNotificationParams.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ClearMySubscriptionDataWithNotificationParams.Request;
		} else {
			return Methods.ClearMySubscriptionDataWithNotificationParams.Response;
		}
	}
}
