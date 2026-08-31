import NEXByteStream from '@/nex/byte-stream';
import Bool from '@/nex/types/bool';
import List from '@/nex/types/list';
import ServiceItemTicketInfo from '@/nex/protocols/service-item/wii-sports-club/types/service-item-ticket-info';
import ServiceItemEvent from '@/nex/protocols/service-item/wii-sports-club/types/service-item-event';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'UpdateAndGetTicketInfo';

	private forceRetrieveFromEShop = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.forceRetrieveFromEShop.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			forceRetrieveFromEShop: this.forceRetrieveFromEShop
		};
	}
}

export class Response {
	public static Name = 'UpdateAndGetTicketInfo';

	private ticketInfos = new List(new ServiceItemTicketInfo());
	private events = new List(new ServiceItemEvent());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ticketInfos.extractFrom(stream);
		this.events.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ticketInfos: this.ticketInfos,
			events: this.events
		};
	}
}
