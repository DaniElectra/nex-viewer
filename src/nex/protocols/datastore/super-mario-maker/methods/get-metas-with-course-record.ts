import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import QResult from '@/nex/types/qresult';
import DataStoreGetCourseRecordParam from '@/nex/protocols/datastore/super-mario-maker/types/datastore-get-course-record-param';
import DataStoreGetMetaParam from '@/nex/protocols/datastore/types/datastore-get-meta-param';
import DataStoreMetaInfo from '@/nex/protocols/datastore/types/datastore-meta-info';
import DataStoreGetCourseRecordResult from '@/nex/protocols/datastore/super-mario-maker/types/datastore-get-course-record-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetMetasWithCourseRecord';

	private params = new List(new DataStoreGetCourseRecordParam());
	private metaParam = new DataStoreGetMetaParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.params.extractFrom(stream);
		this.metaParam.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			params: this.params,
			metaParam: this.metaParam
		};
	}
}

export class Response {
	public static Name = 'GetMetasWithCourseRecord';

	private pMetaInfo = new List(new DataStoreMetaInfo());
	private pCourseResults = new List(new DataStoreGetCourseRecordResult());
	private pResults = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.pMetaInfo.extractFrom(stream);
		this.pCourseResults.extractFrom(stream);
		this.pResults.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			pMetaInfo: this.pMetaInfo,
			pCourseResults: this.pCourseResults,
			pResults: this.pResults
		};
	}
}
