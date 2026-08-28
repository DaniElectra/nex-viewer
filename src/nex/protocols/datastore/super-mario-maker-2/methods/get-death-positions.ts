import NEXByteStream from '@/nex/byte-stream';
import UInt64 from '@/nex/types/uint64';
import List from '@/nex/types/list';
import DeathPositionInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/death-position-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetDeathPositions';

	private dataID = new UInt64();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.dataID.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			dataID: this.dataID
		};
	}
}

export class Response {
	public static Name = 'GetDeathPositions';

	private deathPositions = new List(new DeathPositionInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.deathPositions.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			deathPositions: this.deathPositions
		};
	}
}
