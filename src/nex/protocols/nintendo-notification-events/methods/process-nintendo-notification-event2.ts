import NEXByteStream from '@/nex/byte-stream';
import NintendoNotificationEvent from '@/nex/protocols/nintendo-notification-events/types/nintendo-notification-event';
import type RMCMessage from '@/nex/rmc-message';
import type * as RMCs from '@/types/nex/rmcs/nintendo-notification-events/process-nintendo-notification-event';

export class Request {
	public static Name = 'ProcessNintendoNotificationEvent1';

	private event = new NintendoNotificationEvent();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.event.extractFrom(stream);
	}

	public toJSON(): RMCs.Request {
		return {
			event: this.event
		};
	}
}

// * No response data
export class Response {
	public static Name = 'ProcessNintendoNotificationEvent1';

	constructor() {}

	public toJSON(): RMCs.Response {
		return {};
	}
}
