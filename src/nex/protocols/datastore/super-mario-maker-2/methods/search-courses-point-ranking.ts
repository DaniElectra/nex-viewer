import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import SearchCoursesPointRankingParam from '@/nex/protocols/datastore/super-mario-maker-2/types/search-courses-point-ranking-param';
import CourseInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/course-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchCoursesPointRanking';

	private param = new SearchCoursesPointRankingParam();

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
	public static Name = 'SearchCoursesPointRanking';

	private courseInfo = new List(new CourseInfo());
	private ranks = new List(new UInt32());
	private result = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.courseInfo.extractFrom(stream);
		this.ranks.extractFrom(stream);
		this.result.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			courseInfo: this.courseInfo,
			ranks: this.ranks,
			result: this.result
		};
	}
}
