import NEXByteStream from '@/nex/byte-stream';
import GetEventCourseHistogramParam from '@/nex/protocols/datastore/super-mario-maker-2/types/get-event-course-histogram-param';
import EventCourseHistogram from '@/nex/protocols/datastore/super-mario-maker-2/types/event-course-histogram';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetEventCourseHistogram';

	private param = new GetEventCourseHistogramParam();

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
	public static Name = 'GetEventCourseHistogram';

	private histogramInfo = new EventCourseHistogram();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.histogramInfo.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			histogramInfo: this.histogramInfo
		};
	}
}
