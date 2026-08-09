import UInt32 from '@/nex/types/uint32';
import Data from '@/nex/types/data';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SubscriptionData';

export default class SubscriptionData extends Data {
	public get typeName(): string {
		return className;
	}

	private PrincipalID = new UInt32();
	private unknownQBuffer = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		super.extractFrom(stream);

		this.extractHeaderFrom(stream);

		this.PrincipalID.extractFrom(stream);
		this.unknownQBuffer.extractFrom(stream);
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
				PrincipalID: this.PrincipalID,
				unknownQBuffer: this.unknownQBuffer
			}
		};
	}
}
