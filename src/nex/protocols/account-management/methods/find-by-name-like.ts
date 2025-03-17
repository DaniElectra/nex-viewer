import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import ResultRange from '@/nex/types/result-range';
import List from '@/nex/types/list';
import BasicAccountInfo from '@/nex/protocols/account-management/types/basic-account-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'FindByNameLike';

	private uiGroups = new UInt32();
	private strLike = new RVString();
	private resultRange = new ResultRange();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.uiGroups.extractFrom(stream);
		this.strLike.extractFrom(stream);
		this.resultRange.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			uiGroups: this.uiGroups,
			strLike: this.strLike,
			resultRange: this.resultRange
		};
	}
}

export class Response {
	public static Name = 'FindByNameLike';

	private plstAccounts = new List(new BasicAccountInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection.title);

		this.plstAccounts.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			plstAccounts: this.plstAccounts
		};
	}
}