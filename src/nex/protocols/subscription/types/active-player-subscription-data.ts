import SubscriptionData from '@/nex/protocols/subscription/types/subscription-data';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ActivePlayerSubscriptionData';

export default class ActivePlayerSubscriptionData extends SubscriptionData {
	public get typeName(): string {
		return className;
	}

	private unknownBool = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.unknownBool.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__parent: super.toJSON(),
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				unknownBool: this.unknownBool
			}
		};
	}
}
