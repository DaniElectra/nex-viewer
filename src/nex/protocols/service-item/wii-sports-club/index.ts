import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/service-item/wii-sports-club/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class ServiceItemProtocolWiiSportsClub {
	static ID = 0x77;
	static Name = 'ServiceItem (Wii Sports Club)';

	static Methods = {
		Hello: 0x1,
		HttpGetRequest: 0x2,
		HttpGetResponse: 0x3,
		PurchaseServiceItemRequest: 0x4,
		PurchaseServiceItemResponse: 0x5,
		ListServiceItemRequest: 0x6,
		ListServiceItemResponse: 0x7,
		GetBalanceRequest: 0x8,
		GetBalanceResponse: 0x9,
		GetPrepurchaseInfoRequest: 0xA,
		GetPrepurchaseInfoResponse: 0xB,
		GetServiceItemRightRequest: 0xC,
		GetServiceItemRightResponse: 0xD,
		GetPurchaseHistoryRequest: 0xE,
		GetPurchaseHistoryResponse: 0xF,
		GetNotice: 0x10,
		UpdateAndGetTicketInfo: 0x11,
		LoadUserInfo: 0x12,
		SaveUserInfo: 0x13,
		StartChallenge: 0x14,
		EndChallenge: 0x15,
		RequestTicketRestoration: 0x16
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: ServiceItemProtocolWiiSportsClub.Hello,
		0x2: ServiceItemProtocolWiiSportsClub.HttpGetRequest,
		0x3: ServiceItemProtocolWiiSportsClub.HttpGetResponse,
		0x4: ServiceItemProtocolWiiSportsClub.PurchaseServiceItemRequest,
		0x5: ServiceItemProtocolWiiSportsClub.PurchaseServiceItemResponse,
		0x6: ServiceItemProtocolWiiSportsClub.ListServiceItemRequest,
		0x7: ServiceItemProtocolWiiSportsClub.ListServiceItemResponse,
		0x8: ServiceItemProtocolWiiSportsClub.GetBalanceRequest,
		0x9: ServiceItemProtocolWiiSportsClub.GetBalanceResponse,
		0xA: ServiceItemProtocolWiiSportsClub.GetPrepurchaseInfoRequest,
		0xB: ServiceItemProtocolWiiSportsClub.GetPrepurchaseInfoResponse,
		0xC: ServiceItemProtocolWiiSportsClub.GetServiceItemRightRequest,
		0xD: ServiceItemProtocolWiiSportsClub.GetServiceItemRightResponse,
		0xE: ServiceItemProtocolWiiSportsClub.GetPurchaseHistoryRequest,
		0xF: ServiceItemProtocolWiiSportsClub.GetPurchaseHistoryResponse,
		0x10: ServiceItemProtocolWiiSportsClub.GetNotice,
		0x11: ServiceItemProtocolWiiSportsClub.UpdateAndGetTicketInfo,
		0x12: ServiceItemProtocolWiiSportsClub.LoadUserInfo,
		0x13: ServiceItemProtocolWiiSportsClub.SaveUserInfo,
		0x14: ServiceItemProtocolWiiSportsClub.StartChallenge,
		0x15: ServiceItemProtocolWiiSportsClub.EndChallenge,
		0x16: ServiceItemProtocolWiiSportsClub.RequestTicketRestoration
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = ServiceItemProtocolWiiSportsClub.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static Hello(message: RMCMessage): typeof Methods.Hello.Request | typeof Methods.Hello.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.Hello.Request;
		} else {
			return Methods.Hello.Response;
		}
	}

	private static HttpGetRequest(message: RMCMessage): typeof Methods.HttpGetRequest.Request | typeof Methods.HttpGetRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.HttpGetRequest.Request;
		} else {
			return Methods.HttpGetRequest.Response;
		}
	}

	private static HttpGetResponse(message: RMCMessage): typeof Methods.HttpGetResponse.Request | typeof Methods.HttpGetResponse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.HttpGetResponse.Request;
		} else {
			return Methods.HttpGetResponse.Response;
		}
	}

	private static PurchaseServiceItemRequest(message: RMCMessage): typeof Methods.PurchaseServiceItemRequest.Request | typeof Methods.PurchaseServiceItemRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PurchaseServiceItemRequest.Request;
		} else {
			return Methods.PurchaseServiceItemRequest.Response;
		}
	}

	private static PurchaseServiceItemResponse(message: RMCMessage): typeof Methods.PurchaseServiceItemResponse.Request | typeof Methods.PurchaseServiceItemResponse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PurchaseServiceItemResponse.Request;
		} else {
			return Methods.PurchaseServiceItemResponse.Response;
		}
	}

	private static ListServiceItemRequest(message: RMCMessage): typeof Methods.ListServiceItemRequest.Request | typeof Methods.ListServiceItemRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ListServiceItemRequest.Request;
		} else {
			return Methods.ListServiceItemRequest.Response;
		}
	}

	private static ListServiceItemResponse(message: RMCMessage): typeof Methods.ListServiceItemResponse.Request | typeof Methods.ListServiceItemResponse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ListServiceItemResponse.Request;
		} else {
			return Methods.ListServiceItemResponse.Response;
		}
	}

	private static GetBalanceRequest(message: RMCMessage): typeof Methods.GetBalanceRequest.Request | typeof Methods.GetBalanceRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetBalanceRequest.Request;
		} else {
			return Methods.GetBalanceRequest.Response;
		}
	}

	private static GetBalanceResponse(message: RMCMessage): typeof Methods.GetBalanceResponse.Request | typeof Methods.GetBalanceResponse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetBalanceResponse.Request;
		} else {
			return Methods.GetBalanceResponse.Response;
		}
	}

	private static GetPrepurchaseInfoRequest(message: RMCMessage): typeof Methods.GetPrepurchaseInfoRequest.Request | typeof Methods.GetPrepurchaseInfoRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPrepurchaseInfoRequest.Request;
		} else {
			return Methods.GetPrepurchaseInfoRequest.Response;
		}
	}

	private static GetPrepurchaseInfoResponse(message: RMCMessage): typeof Methods.GetPrepurchaseInfoResponse.Request | typeof Methods.GetPrepurchaseInfoResponse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPrepurchaseInfoResponse.Request;
		} else {
			return Methods.GetPrepurchaseInfoResponse.Response;
		}
	}

	private static GetServiceItemRightRequest(message: RMCMessage): typeof Methods.GetServiceItemRightRequest.Request | typeof Methods.GetServiceItemRightRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetServiceItemRightRequest.Request;
		} else {
			return Methods.GetServiceItemRightRequest.Response;
		}
	}

	private static GetServiceItemRightResponse(message: RMCMessage): typeof Methods.GetServiceItemRightResponse.Request | typeof Methods.GetServiceItemRightResponse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetServiceItemRightResponse.Request;
		} else {
			return Methods.GetServiceItemRightResponse.Response;
		}
	}

	private static GetPurchaseHistoryRequest(message: RMCMessage): typeof Methods.GetPurchaseHistoryRequest.Request | typeof Methods.GetPurchaseHistoryRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPurchaseHistoryRequest.Request;
		} else {
			return Methods.GetPurchaseHistoryRequest.Response;
		}
	}

	private static GetPurchaseHistoryResponse(message: RMCMessage): typeof Methods.GetPurchaseHistoryResponse.Request | typeof Methods.GetPurchaseHistoryResponse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetPurchaseHistoryResponse.Request;
		} else {
			return Methods.GetPurchaseHistoryResponse.Response;
		}
	}

	private static GetNotice(message: RMCMessage): typeof Methods.GetNotice.Request | typeof Methods.GetNotice.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetNotice.Request;
		} else {
			return Methods.GetNotice.Response;
		}
	}

	private static UpdateAndGetTicketInfo(message: RMCMessage): typeof Methods.UpdateAndGetTicketInfo.Request | typeof Methods.UpdateAndGetTicketInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UpdateAndGetTicketInfo.Request;
		} else {
			return Methods.UpdateAndGetTicketInfo.Response;
		}
	}

	private static LoadUserInfo(message: RMCMessage): typeof Methods.LoadUserInfo.Request | typeof Methods.LoadUserInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.LoadUserInfo.Request;
		} else {
			return Methods.LoadUserInfo.Response;
		}
	}

	private static SaveUserInfo(message: RMCMessage): typeof Methods.SaveUserInfo.Request | typeof Methods.SaveUserInfo.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SaveUserInfo.Request;
		} else {
			return Methods.SaveUserInfo.Response;
		}
	}

	private static StartChallenge(message: RMCMessage): typeof Methods.StartChallenge.Request | typeof Methods.StartChallenge.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.StartChallenge.Request;
		} else {
			return Methods.StartChallenge.Response;
		}
	}

	private static EndChallenge(message: RMCMessage): typeof Methods.EndChallenge.Request | typeof Methods.EndChallenge.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EndChallenge.Request;
		} else {
			return Methods.EndChallenge.Response;
		}
	}

	private static RequestTicketRestoration(message: RMCMessage): typeof Methods.RequestTicketRestoration.Request | typeof Methods.RequestTicketRestoration.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.RequestTicketRestoration.Request;
		} else {
			return Methods.RequestTicketRestoration.Response;
		}
	}
}
