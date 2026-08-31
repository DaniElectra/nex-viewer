import RMCMessage from '@/nex/rmc-message';
import RankingProtocolLegacy from '@/nex/protocols/ranking/legacy';
import * as Methods from '@/nex/protocols/ranking/mario-kart-7/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class RankingProtocolMarioKart7 {
	static ID = 0x70;
	static Name = 'Ranking (Mario Kart 7)';

	static Methods = {
		UploadSpecificPeriodScore: 0x14,
		UnknownMethod0x15: 0x15,
		GetSpecificPeriodDataList: 0x16,
		UnknownMethod0x17: 0x17,
		UnknownMethod0x18: 0x18,
		GetSpecificPeriodTotal: 0x19
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x14: RankingProtocolMarioKart7.UploadSpecificPeriodScore,
		0x15: RankingProtocolMarioKart7.UnknownMethod0x15,
		0x16: RankingProtocolMarioKart7.GetSpecificPeriodDataList,
		0x17: RankingProtocolMarioKart7.UnknownMethod0x17,
		0x18: RankingProtocolMarioKart7.UnknownMethod0x18,
		0x19: RankingProtocolMarioKart7.GetSpecificPeriodTotal
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = RankingProtocolMarioKart7.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			RankingProtocolLegacy.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UploadSpecificPeriodScore(message: RMCMessage): typeof Methods.UploadSpecificPeriodScore.Request | typeof Methods.UploadSpecificPeriodScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadSpecificPeriodScore.Request;
		} else {
			return Methods.UploadSpecificPeriodScore.Response;
		}
	}

	private static UnknownMethod0x15(message: RMCMessage): typeof Methods.UnknownMethod0x15.Request | typeof Methods.UnknownMethod0x15.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x15.Request;
		} else {
			return Methods.UnknownMethod0x15.Response;
		}
	}

	private static GetSpecificPeriodDataList(message: RMCMessage): typeof Methods.GetSpecificPeriodDataList.Request | typeof Methods.GetSpecificPeriodDataList.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSpecificPeriodDataList.Request;
		} else {
			return Methods.GetSpecificPeriodDataList.Response;
		}
	}

	private static UnknownMethod0x17(message: RMCMessage): typeof Methods.UnknownMethod0x17.Request | typeof Methods.UnknownMethod0x17.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x17.Request;
		} else {
			return Methods.UnknownMethod0x17.Response;
		}
	}

	private static UnknownMethod0x18(message: RMCMessage): typeof Methods.UnknownMethod0x18.Request | typeof Methods.UnknownMethod0x18.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x18.Request;
		} else {
			return Methods.UnknownMethod0x18.Response;
		}
	}

	private static GetSpecificPeriodTotal(message: RMCMessage): typeof Methods.GetSpecificPeriodTotal.Request | typeof Methods.GetSpecificPeriodTotal.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetSpecificPeriodTotal.Request;
		} else {
			return Methods.GetSpecificPeriodTotal.Response;
		}
	}
}
