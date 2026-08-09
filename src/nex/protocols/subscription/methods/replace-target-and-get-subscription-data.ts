import List from '@/nex/types/list';
import SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import PID from '@/nex/types/pid';
import NEXByteStream from '@/nex/byte-stream';
import type RMCMessage from '@/nex/rmc-message';

export class Request {
	public static Name = 'ReplaceTargetAndGetSubscriptionData';

	private newTargets = new List(new PID());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.newTargets.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			newTargets: this.newTargets
		};
	}
}

export class Response {
	public static Name = 'ReplaceTargetAndGetSubscriptionData';

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
