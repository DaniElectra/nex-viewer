import RMCMessage from '@/nex/rmc-message';
import DataStoreProtocol from '@/nex/protocols/datastore';
import * as Methods from '@/nex/protocols/datastore/super-smash-bros-ultimate/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DataStoreProtocolSuperSmashBrosUltimate {
	static ID = 0x73;
	static Name = 'DataStore (Super Smash Bros. Ultimate)';

	static Methods = {
		UnknownMethod0x2F: 0x2F,
		UnknownMethod0x30: 0x30,
		UnknownMethod0x31: 0x31,
		UnknownMethod0x32: 0x32,
		UnknownMethod0x33: 0x33,
		UnknownMethod0x34: 0x34,
		UnknownMethod0x35: 0x35,
		UnknownMethod0x36: 0x36,
		UnknownMethod0x37: 0x37,
		UnknownMethod0x38: 0x38,
		UnknownMethod0x39: 0x39,
		UnknownMethod0x3A: 0x3A,
		UnknownMethod0x3B: 0x3B,
		UnknownMethod0x3C: 0x3C,
		UnknownMethod0x3D: 0x3D,
		UnknownMethod0x3E: 0x3E,
		UnknownMethod0x3F: 0x3F,
		UnknownMethod0x40: 0x40,
		UnknownMethod0x41: 0x41,
		UnknownMethod0x42: 0x42,
		UnknownMethod0x43: 0x43,
		UnknownMethod0x44: 0x44,
		UnknownMethod0x45: 0x45,
		UnknownMethod0x46: 0x46,
		UnknownMethod0x47: 0x47,
		UnknownMethod0x48: 0x48,
		UnknownMethod0x49: 0x49,
		UnknownMethod0x4A: 0x4A,
		UnknownMethod0x4B: 0x4B,
		UnknownMethod0x4C: 0x4C,
		UnknownMethod0x4D: 0x4D,
		UnknownMethod0x4E: 0x4E,
		UnknownMethod0x4F: 0x4F,
		UnknownMethod0x50: 0x50,
		UnknownMethod0x51: 0x51,
		UnknownMethod0x52: 0x52,
		UnknownMethod0x53: 0x53,
		UnknownMethod0x54: 0x54
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x2F: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x2F,
		0x30: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x30,
		0x31: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x31,
		0x32: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x32,
		0x33: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x33,
		0x34: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x34,
		0x35: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x35,
		0x36: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x36,
		0x37: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x37,
		0x38: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x38,
		0x39: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x39,
		0x3A: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x3A,
		0x3B: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x3B,
		0x3C: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x3C,
		0x3D: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x3D,
		0x3E: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x3E,
		0x3F: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x3F,
		0x40: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x40,
		0x41: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x41,
		0x42: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x42,
		0x43: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x43,
		0x44: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x44,
		0x45: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x45,
		0x46: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x46,
		0x47: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x47,
		0x48: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x48,
		0x49: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x49,
		0x4A: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x4A,
		0x4B: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x4B,
		0x4C: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x4C,
		0x4D: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x4D,
		0x4E: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x4E,
		0x4F: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x4F,
		0x50: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x50,
		0x51: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x51,
		0x52: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x52,
		0x53: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x53,
		0x54: DataStoreProtocolSuperSmashBrosUltimate.UnknownMethod0x54
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DataStoreProtocolSuperSmashBrosUltimate.handlers[methodID];

		if (!handler) {
			// * Not a patched method, let the base protocol handle it
			DataStoreProtocol.handlePacket(packet);
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static UnknownMethod0x2F(message: RMCMessage): typeof Methods.UnknownMethod0x2F.Request | typeof Methods.UnknownMethod0x2F.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x2F.Request;
		} else {
			return Methods.UnknownMethod0x2F.Response;
		}
	}

	private static UnknownMethod0x30(message: RMCMessage): typeof Methods.UnknownMethod0x30.Request | typeof Methods.UnknownMethod0x30.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x30.Request;
		} else {
			return Methods.UnknownMethod0x30.Response;
		}
	}

	private static UnknownMethod0x31(message: RMCMessage): typeof Methods.UnknownMethod0x31.Request | typeof Methods.UnknownMethod0x31.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x31.Request;
		} else {
			return Methods.UnknownMethod0x31.Response;
		}
	}

	private static UnknownMethod0x32(message: RMCMessage): typeof Methods.UnknownMethod0x32.Request | typeof Methods.UnknownMethod0x32.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x32.Request;
		} else {
			return Methods.UnknownMethod0x32.Response;
		}
	}

	private static UnknownMethod0x33(message: RMCMessage): typeof Methods.UnknownMethod0x33.Request | typeof Methods.UnknownMethod0x33.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x33.Request;
		} else {
			return Methods.UnknownMethod0x33.Response;
		}
	}

	private static UnknownMethod0x34(message: RMCMessage): typeof Methods.UnknownMethod0x34.Request | typeof Methods.UnknownMethod0x34.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x34.Request;
		} else {
			return Methods.UnknownMethod0x34.Response;
		}
	}

	private static UnknownMethod0x35(message: RMCMessage): typeof Methods.UnknownMethod0x35.Request | typeof Methods.UnknownMethod0x35.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x35.Request;
		} else {
			return Methods.UnknownMethod0x35.Response;
		}
	}

	private static UnknownMethod0x36(message: RMCMessage): typeof Methods.UnknownMethod0x36.Request | typeof Methods.UnknownMethod0x36.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x36.Request;
		} else {
			return Methods.UnknownMethod0x36.Response;
		}
	}

	private static UnknownMethod0x37(message: RMCMessage): typeof Methods.UnknownMethod0x37.Request | typeof Methods.UnknownMethod0x37.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x37.Request;
		} else {
			return Methods.UnknownMethod0x37.Response;
		}
	}

	private static UnknownMethod0x38(message: RMCMessage): typeof Methods.UnknownMethod0x38.Request | typeof Methods.UnknownMethod0x38.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x38.Request;
		} else {
			return Methods.UnknownMethod0x38.Response;
		}
	}

	private static UnknownMethod0x39(message: RMCMessage): typeof Methods.UnknownMethod0x39.Request | typeof Methods.UnknownMethod0x39.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x39.Request;
		} else {
			return Methods.UnknownMethod0x39.Response;
		}
	}

	private static UnknownMethod0x3A(message: RMCMessage): typeof Methods.UnknownMethod0x3A.Request | typeof Methods.UnknownMethod0x3A.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x3A.Request;
		} else {
			return Methods.UnknownMethod0x3A.Response;
		}
	}

	private static UnknownMethod0x3B(message: RMCMessage): typeof Methods.UnknownMethod0x3B.Request | typeof Methods.UnknownMethod0x3B.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x3B.Request;
		} else {
			return Methods.UnknownMethod0x3B.Response;
		}
	}

	private static UnknownMethod0x3C(message: RMCMessage): typeof Methods.UnknownMethod0x3C.Request | typeof Methods.UnknownMethod0x3C.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x3C.Request;
		} else {
			return Methods.UnknownMethod0x3C.Response;
		}
	}

	private static UnknownMethod0x3D(message: RMCMessage): typeof Methods.UnknownMethod0x3D.Request | typeof Methods.UnknownMethod0x3D.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x3D.Request;
		} else {
			return Methods.UnknownMethod0x3D.Response;
		}
	}

	private static UnknownMethod0x3E(message: RMCMessage): typeof Methods.UnknownMethod0x3E.Request | typeof Methods.UnknownMethod0x3E.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x3E.Request;
		} else {
			return Methods.UnknownMethod0x3E.Response;
		}
	}

	private static UnknownMethod0x3F(message: RMCMessage): typeof Methods.UnknownMethod0x3F.Request | typeof Methods.UnknownMethod0x3F.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x3F.Request;
		} else {
			return Methods.UnknownMethod0x3F.Response;
		}
	}

	private static UnknownMethod0x40(message: RMCMessage): typeof Methods.UnknownMethod0x40.Request | typeof Methods.UnknownMethod0x40.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x40.Request;
		} else {
			return Methods.UnknownMethod0x40.Response;
		}
	}

	private static UnknownMethod0x41(message: RMCMessage): typeof Methods.UnknownMethod0x41.Request | typeof Methods.UnknownMethod0x41.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x41.Request;
		} else {
			return Methods.UnknownMethod0x41.Response;
		}
	}

	private static UnknownMethod0x42(message: RMCMessage): typeof Methods.UnknownMethod0x42.Request | typeof Methods.UnknownMethod0x42.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x42.Request;
		} else {
			return Methods.UnknownMethod0x42.Response;
		}
	}

	private static UnknownMethod0x43(message: RMCMessage): typeof Methods.UnknownMethod0x43.Request | typeof Methods.UnknownMethod0x43.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x43.Request;
		} else {
			return Methods.UnknownMethod0x43.Response;
		}
	}

	private static UnknownMethod0x44(message: RMCMessage): typeof Methods.UnknownMethod0x44.Request | typeof Methods.UnknownMethod0x44.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x44.Request;
		} else {
			return Methods.UnknownMethod0x44.Response;
		}
	}

	private static UnknownMethod0x45(message: RMCMessage): typeof Methods.UnknownMethod0x45.Request | typeof Methods.UnknownMethod0x45.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x45.Request;
		} else {
			return Methods.UnknownMethod0x45.Response;
		}
	}

	private static UnknownMethod0x46(message: RMCMessage): typeof Methods.UnknownMethod0x46.Request | typeof Methods.UnknownMethod0x46.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x46.Request;
		} else {
			return Methods.UnknownMethod0x46.Response;
		}
	}

	private static UnknownMethod0x47(message: RMCMessage): typeof Methods.UnknownMethod0x47.Request | typeof Methods.UnknownMethod0x47.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x47.Request;
		} else {
			return Methods.UnknownMethod0x47.Response;
		}
	}

	private static UnknownMethod0x48(message: RMCMessage): typeof Methods.UnknownMethod0x48.Request | typeof Methods.UnknownMethod0x48.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x48.Request;
		} else {
			return Methods.UnknownMethod0x48.Response;
		}
	}

	private static UnknownMethod0x49(message: RMCMessage): typeof Methods.UnknownMethod0x49.Request | typeof Methods.UnknownMethod0x49.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x49.Request;
		} else {
			return Methods.UnknownMethod0x49.Response;
		}
	}

	private static UnknownMethod0x4A(message: RMCMessage): typeof Methods.UnknownMethod0x4A.Request | typeof Methods.UnknownMethod0x4A.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x4A.Request;
		} else {
			return Methods.UnknownMethod0x4A.Response;
		}
	}

	private static UnknownMethod0x4B(message: RMCMessage): typeof Methods.UnknownMethod0x4B.Request | typeof Methods.UnknownMethod0x4B.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x4B.Request;
		} else {
			return Methods.UnknownMethod0x4B.Response;
		}
	}

	private static UnknownMethod0x4C(message: RMCMessage): typeof Methods.UnknownMethod0x4C.Request | typeof Methods.UnknownMethod0x4C.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x4C.Request;
		} else {
			return Methods.UnknownMethod0x4C.Response;
		}
	}

	private static UnknownMethod0x4D(message: RMCMessage): typeof Methods.UnknownMethod0x4D.Request | typeof Methods.UnknownMethod0x4D.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x4D.Request;
		} else {
			return Methods.UnknownMethod0x4D.Response;
		}
	}

	private static UnknownMethod0x4E(message: RMCMessage): typeof Methods.UnknownMethod0x4E.Request | typeof Methods.UnknownMethod0x4E.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x4E.Request;
		} else {
			return Methods.UnknownMethod0x4E.Response;
		}
	}

	private static UnknownMethod0x4F(message: RMCMessage): typeof Methods.UnknownMethod0x4F.Request | typeof Methods.UnknownMethod0x4F.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x4F.Request;
		} else {
			return Methods.UnknownMethod0x4F.Response;
		}
	}

	private static UnknownMethod0x50(message: RMCMessage): typeof Methods.UnknownMethod0x50.Request | typeof Methods.UnknownMethod0x50.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x50.Request;
		} else {
			return Methods.UnknownMethod0x50.Response;
		}
	}

	private static UnknownMethod0x51(message: RMCMessage): typeof Methods.UnknownMethod0x51.Request | typeof Methods.UnknownMethod0x51.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x51.Request;
		} else {
			return Methods.UnknownMethod0x51.Response;
		}
	}

	private static UnknownMethod0x52(message: RMCMessage): typeof Methods.UnknownMethod0x52.Request | typeof Methods.UnknownMethod0x52.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x52.Request;
		} else {
			return Methods.UnknownMethod0x52.Response;
		}
	}

	private static UnknownMethod0x53(message: RMCMessage): typeof Methods.UnknownMethod0x53.Request | typeof Methods.UnknownMethod0x53.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x53.Request;
		} else {
			return Methods.UnknownMethod0x53.Response;
		}
	}

	private static UnknownMethod0x54(message: RMCMessage): typeof Methods.UnknownMethod0x54.Request | typeof Methods.UnknownMethod0x54.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.UnknownMethod0x54.Request;
		} else {
			return Methods.UnknownMethod0x54.Response;
		}
	}
}
