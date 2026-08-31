import NEXByteStream from '@/nex/byte-stream';
import RentalObjectInfo from '@/nex/protocols/datastore/xenoblade-chronicles-x/types/rental-object-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetRentalObject';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetRentalObject';

	private rentalObject = new RentalObjectInfo();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.rentalObject.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			rentalObject: this.rentalObject
		};
	}
}
