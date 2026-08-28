import NEXByteStream from '@/nex/byte-stream';
import RentalObjectSearchParam from '@/nex/protocols/datastore/xenoblade-chronicles-x/types/rental-object-search-param';
import RentalObjectSearchResult from '@/nex/protocols/datastore/xenoblade-chronicles-x/types/rental-object-search-result';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchRentalObject';

	private param = new RentalObjectSearchParam();

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
	public static Name = 'SearchRentalObject';

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
