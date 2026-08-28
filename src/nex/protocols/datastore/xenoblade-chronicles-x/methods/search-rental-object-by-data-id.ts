import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import RentalObjectSearchParam from '@/nex/protocols/datastore/xenoblade-chronicles-x/types/rental-object-search-param';
import RentalObjectSearchResult from '@/nex/protocols/datastore/xenoblade-chronicles-x/types/rental-object-search-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchRentalObjectByDataId';

	private dataId = new UInt64();
	private param = new RentalObjectSearchParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataId.extractFrom(stream);
		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataId: this.dataId,
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'SearchRentalObjectByDataId';

	private results = new RentalObjectSearchResult();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.results.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			results: this.results
		};
	}
}
