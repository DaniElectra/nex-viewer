import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import GetEventCourseGhostParam from '@/nex/protocols/datastore/super-mario-maker-2/types/get-event-course-ghost-param';
import EventCourseGhostInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/event-course-ghost-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetEventCourseGhost';

	private param = new GetEventCourseGhostParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'GetEventCourseGhost';

	private ghosts = new List(new EventCourseGhostInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.ghosts.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			ghosts: this.ghosts
		};
	}
}
