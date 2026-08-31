import NEXByteStream from '@/nex/byte-stream';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

// * No request data
export class Request {
	public static Name = 'GetMaintenanceStatus';

	constructor() {}

	public toJSON(): any {
		return {};
	}
}

export class Response {
	public static Name = 'GetMaintenanceStatus';

	private maintenanceStatus = new UInt16();
	private maintenanceTime = new UInt32();
	private isSuccess = new Bool();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.maintenanceStatus.extractFrom(stream);
		this.maintenanceTime.extractFrom(stream);
		this.isSuccess.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			maintenanceStatus: this.maintenanceStatus,
			maintenanceTime: this.maintenanceTime,
			isSuccess: this.isSuccess
		};
	}
}
