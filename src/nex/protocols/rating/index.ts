import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/rating/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class RatingProtocol {
	static ID = 0x76;
	static Name = 'Rating';

	static Methods = {
		UnknownMethod0x1: 0x1,
		UnknownMethod0x2: 0x2,
		ReportRatingStats: 0x3,
		GetRanking: 0x4,
		DeleteScore: 0x5,
		UnknownMethod0x6: 0x6,
		UploadCommonData: 0x7,
		GetCommonData: 0x8,
		UnknownMethod0x9: 0x9
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: RatingProtocol.UnknownMethod0x1,
		0x2: RatingProtocol.UnknownMethod0x2,
		0x3: RatingProtocol.ReportRatingStats,
		0x4: RatingProtocol.GetRanking,
		0x5: RatingProtocol.DeleteScore,
		0x6: RatingProtocol.UnknownMethod0x6,
		0x7: RatingProtocol.UploadCommonData,
		0x8: RatingProtocol.GetCommonData,
		0x9: RatingProtocol.UnknownMethod0x9
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = RatingProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UnknownMethod0x1(message: RMCMessage): typeof Methods.UnknownMethod0x1.Request | typeof Methods.UnknownMethod0x1.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x1.Request;
		} else {
			return Methods.UnknownMethod0x1.Response;
		}
	}

	private static UnknownMethod0x2(message: RMCMessage): typeof Methods.UnknownMethod0x2.Request | typeof Methods.UnknownMethod0x2.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x2.Request;
		} else {
			return Methods.UnknownMethod0x2.Response;
		}
	}

	private static ReportRatingStats(message: RMCMessage): typeof Methods.ReportRatingStats.Request | typeof Methods.ReportRatingStats.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.ReportRatingStats.Request;
		} else {
			return Methods.ReportRatingStats.Response;
		}
	}

	private static GetRanking(message: RMCMessage): typeof Methods.GetRanking.Request | typeof Methods.GetRanking.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetRanking.Request;
		} else {
			return Methods.GetRanking.Response;
		}
	}

	private static DeleteScore(message: RMCMessage): typeof Methods.DeleteScore.Request | typeof Methods.DeleteScore.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DeleteScore.Request;
		} else {
			return Methods.DeleteScore.Response;
		}
	}

	private static UnknownMethod0x6(message: RMCMessage): typeof Methods.UnknownMethod0x6.Request | typeof Methods.UnknownMethod0x6.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x6.Request;
		} else {
			return Methods.UnknownMethod0x6.Response;
		}
	}

	private static UploadCommonData(message: RMCMessage): typeof Methods.UploadCommonData.Request | typeof Methods.UploadCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UploadCommonData.Request;
		} else {
			return Methods.UploadCommonData.Response;
		}
	}

	private static GetCommonData(message: RMCMessage): typeof Methods.GetCommonData.Request | typeof Methods.GetCommonData.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetCommonData.Request;
		} else {
			return Methods.GetCommonData.Response;
		}
	}

	private static UnknownMethod0x9(message: RMCMessage): typeof Methods.UnknownMethod0x9.Request | typeof Methods.UnknownMethod0x9.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x9.Request;
		} else {
			return Methods.UnknownMethod0x9.Response;
		}
	}
}
