import RMCMessage from '@/nex/rmc-message';
import * as Methods from '@/nex/protocols/debug/methods';
import type PRUDPPacket from '@/types/nex/prudp-packet';

export default class DebugProtocol {
	static ID = 0x74;
	static Name = 'Debug';

	static Methods = {
		EnableApiRecorder: 0x1,
		DisableApiRecorder: 0x2,
		IsApiRecorderEnabled: 0x3,
		GetApiCalls: 0x4,
		SetExcludeJoinedMatchmakeSession: 0x5,
		GetExcludeJoinedMatchmakeSession: 0x6,
		GetApiCallSummary: 0x7
	};

	private static handlers: Record<number, (message: RMCMessage) => any> = {
		0x1: DebugProtocol.EnableApiRecorder,
		0x2: DebugProtocol.DisableApiRecorder,
		0x3: DebugProtocol.IsApiRecorderEnabled,
		0x4: DebugProtocol.GetApiCalls,
		0x5: DebugProtocol.SetExcludeJoinedMatchmakeSession,
		0x6: DebugProtocol.GetExcludeJoinedMatchmakeSession,
		0x7: DebugProtocol.GetApiCallSummary
	};

	static handlePacket(packet: PRUDPPacket): void {
		if (!packet.message) {
			// * This will never happen. Only checked to make TypeScript happy
			return;
		}

		const methodID = packet.message.methodID;
		const handler = DebugProtocol.handlers[methodID];

		if (!handler) {
			packet.message.methodName = `UnknownMethod_0x${methodID.toString(16).toUpperCase().padStart(2, '0')}`;
			return;
		}

		const messageDecoder = handler(packet.message);

		packet.message.methodName = messageDecoder.Name;
		packet.message.parameters = new messageDecoder(packet.message);
	}

	private static EnableApiRecorder(message: RMCMessage): typeof Methods.EnableApiRecorder.Request | typeof Methods.EnableApiRecorder.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.EnableApiRecorder.Request;
		} else {
			return Methods.EnableApiRecorder.Response;
		}
	}

	private static DisableApiRecorder(message: RMCMessage): typeof Methods.DisableApiRecorder.Request | typeof Methods.DisableApiRecorder.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.DisableApiRecorder.Request;
		} else {
			return Methods.DisableApiRecorder.Response;
		}
	}

	private static IsApiRecorderEnabled(message: RMCMessage): typeof Methods.IsApiRecorderEnabled.Request | typeof Methods.IsApiRecorderEnabled.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.IsApiRecorderEnabled.Request;
		} else {
			return Methods.IsApiRecorderEnabled.Response;
		}
	}

	private static GetApiCalls(message: RMCMessage): typeof Methods.GetApiCalls.Request | typeof Methods.GetApiCalls.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetApiCalls.Request;
		} else {
			return Methods.GetApiCalls.Response;
		}
	}

	private static SetExcludeJoinedMatchmakeSession(message: RMCMessage): typeof Methods.SetExcludeJoinedMatchmakeSession.Request | typeof Methods.SetExcludeJoinedMatchmakeSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.SetExcludeJoinedMatchmakeSession.Request;
		} else {
			return Methods.SetExcludeJoinedMatchmakeSession.Response;
		}
	}

	private static GetExcludeJoinedMatchmakeSession(message: RMCMessage): typeof Methods.GetExcludeJoinedMatchmakeSession.Request | typeof Methods.GetExcludeJoinedMatchmakeSession.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetExcludeJoinedMatchmakeSession.Request;
		} else {
			return Methods.GetExcludeJoinedMatchmakeSession.Response;
		}
	}

	private static GetApiCallSummary(message: RMCMessage): typeof Methods.GetApiCallSummary.Request | typeof Methods.GetApiCallSummary.Response {
		if (message.type === RMCMessage.REQUEST) {
			return Methods.GetApiCallSummary.Request;
		} else {
			return Methods.GetApiCallSummary.Response;
		}
	}
}
