import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/service-item/team-kirby-clash-deluxe/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class ServiceItemProtocolTeamKirbyClashDeluxe {
	static ID = 0x77;
	static Name = 'ServiceItem (Team Kirby Clash Deluxe)';

	static Methods = {
		GetEnvironment: 0x1,
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
		PostRightBinaryByAccount: 0x10,
		UseServiceItemByAccountRequest: 0x11,
		UseServiceItemByAccountResponse: 0x12,
		AcquireServiceItemByAccount: 0x13,
		GetSupportId: 0x14,
		GetLawMessageRequest: 0x15,
		GetLawMessageResponse: 0x16
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: ServiceItemProtocolTeamKirbyClashDeluxe.GetEnvironment,
		0x2: ServiceItemProtocolTeamKirbyClashDeluxe.HttpGetRequest,
		0x3: ServiceItemProtocolTeamKirbyClashDeluxe.HttpGetResponse,
		0x4: ServiceItemProtocolTeamKirbyClashDeluxe.PurchaseServiceItemRequest,
		0x5: ServiceItemProtocolTeamKirbyClashDeluxe.PurchaseServiceItemResponse,
		0x6: ServiceItemProtocolTeamKirbyClashDeluxe.ListServiceItemRequest,
		0x7: ServiceItemProtocolTeamKirbyClashDeluxe.ListServiceItemResponse,
		0x8: ServiceItemProtocolTeamKirbyClashDeluxe.GetBalanceRequest,
		0x9: ServiceItemProtocolTeamKirbyClashDeluxe.GetBalanceResponse,
		0xA: ServiceItemProtocolTeamKirbyClashDeluxe.GetPrepurchaseInfoRequest,
		0xB: ServiceItemProtocolTeamKirbyClashDeluxe.GetPrepurchaseInfoResponse,
		0xC: ServiceItemProtocolTeamKirbyClashDeluxe.GetServiceItemRightRequest,
		0xD: ServiceItemProtocolTeamKirbyClashDeluxe.GetServiceItemRightResponse,
		0xE: ServiceItemProtocolTeamKirbyClashDeluxe.GetPurchaseHistoryRequest,
		0xF: ServiceItemProtocolTeamKirbyClashDeluxe.GetPurchaseHistoryResponse,
		0x10: ServiceItemProtocolTeamKirbyClashDeluxe.PostRightBinaryByAccount,
		0x11: ServiceItemProtocolTeamKirbyClashDeluxe.UseServiceItemByAccountRequest,
		0x12: ServiceItemProtocolTeamKirbyClashDeluxe.UseServiceItemByAccountResponse,
		0x13: ServiceItemProtocolTeamKirbyClashDeluxe.AcquireServiceItemByAccount,
		0x14: ServiceItemProtocolTeamKirbyClashDeluxe.GetSupportId,
		0x15: ServiceItemProtocolTeamKirbyClashDeluxe.GetLawMessageRequest,
		0x16: ServiceItemProtocolTeamKirbyClashDeluxe.GetLawMessageResponse
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = ServiceItemProtocolTeamKirbyClashDeluxe.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static GetEnvironment(message: RMCMessage): typeof Methods.GetEnvironment.Request | typeof Methods.GetEnvironment.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetEnvironment.Request;
		} else {
			return Methods.GetEnvironment.Response;
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

	private static PostRightBinaryByAccount(message: RMCMessage): typeof Methods.PostRightBinaryByAccount.Request | typeof Methods.PostRightBinaryByAccount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.PostRightBinaryByAccount.Request;
		} else {
			return Methods.PostRightBinaryByAccount.Response;
		}
	}

	private static UseServiceItemByAccountRequest(message: RMCMessage): typeof Methods.UseServiceItemByAccountRequest.Request | typeof Methods.UseServiceItemByAccountRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UseServiceItemByAccountRequest.Request;
		} else {
			return Methods.UseServiceItemByAccountRequest.Response;
		}
	}

	private static UseServiceItemByAccountResponse(message: RMCMessage): typeof Methods.UseServiceItemByAccountResponse.Request | typeof Methods.UseServiceItemByAccountResponse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UseServiceItemByAccountResponse.Request;
		} else {
			return Methods.UseServiceItemByAccountResponse.Response;
		}
	}

	private static AcquireServiceItemByAccount(message: RMCMessage): typeof Methods.AcquireServiceItemByAccount.Request | typeof Methods.AcquireServiceItemByAccount.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.AcquireServiceItemByAccount.Request;
		} else {
			return Methods.AcquireServiceItemByAccount.Response;
		}
	}

	private static GetSupportId(message: RMCMessage): typeof Methods.GetSupportId.Request | typeof Methods.GetSupportId.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSupportId.Request;
		} else {
			return Methods.GetSupportId.Response;
		}
	}

	private static GetLawMessageRequest(message: RMCMessage): typeof Methods.GetLawMessageRequest.Request | typeof Methods.GetLawMessageRequest.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetLawMessageRequest.Request;
		} else {
			return Methods.GetLawMessageRequest.Response;
		}
	}

	private static GetLawMessageResponse(message: RMCMessage): typeof Methods.GetLawMessageResponse.Request | typeof Methods.GetLawMessageResponse.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetLawMessageResponse.Request;
		} else {
			return Methods.GetLawMessageResponse.Response;
		}
	}
}
