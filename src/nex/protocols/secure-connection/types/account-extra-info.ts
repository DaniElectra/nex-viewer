import Data from '@/nex/types/data';
import String from '@/nex/types/string';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

export default class AccountExtraInfo extends Data {
	public get typeName(): string {
		return 'AccountExtraInfo';
	}

	private token = new String();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.token.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				token: this.token
			}
		};
	}
}

AnyDataHolder.Classes['AccountExtraInfo'] = AccountExtraInfo;
