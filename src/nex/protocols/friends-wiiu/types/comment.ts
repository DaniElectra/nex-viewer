import Data from '@/nex/types/data';
import UInt8 from '@/nex/types/uint8';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class Comment extends Data {
	public get typeName(): string {
		return 'Comment';
	}

	private unknown = new UInt8();
	private message = new RVString();
	private lastChanged = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown.extractFrom(stream);
		this.message.extractFrom(stream);
		this.lastChanged.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				unknown: this.unknown,
				message: this.message,
				lastChanged: this.lastChanged
			}
		};
	}
}
