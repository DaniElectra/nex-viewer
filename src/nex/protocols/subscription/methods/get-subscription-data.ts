import type RMCMessage from "@/nex/rmc-message";
import List from "@/nex/types/list";
import SubscriptionData from "@/nex/protocols/subscription/types/subscription-data";
import PID from "@/nex/types/pid";
import NEXByteStream from "@/nex/byte-stream"

export class Request {
	public static Name = 'GetSubscriptionData';

	private PIDs = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!)
	
		this.PIDs.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			PIDs: this.PIDs
		};
	}
}

export class Response {
	public static Name = 'GetSubscriptionData';

	private dataForPIDs = new List(new SubscriptionData());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataForPIDs.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataForPIDs: this.dataForPIDs
		};
	}
}
