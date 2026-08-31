import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Ranking2CategorySetting from '@/nex/protocols/ranking-2/types/ranking2-category-setting';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetCategorySetting';

	private category = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.category.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			category: this.category
		};
	}
}

export class Response {
	public static Name = 'GetCategorySetting';

	private categorySetting = new Ranking2CategorySetting();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.categorySetting.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			categorySetting: this.categorySetting
		};
	}
}
