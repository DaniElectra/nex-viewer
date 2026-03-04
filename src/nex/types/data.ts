import Structure from '@/nex/types/structure';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'Data';

// * This is purely the parent class for all types which are allowed in AnyDataHolder.
// * See https://nintendo.wiki/wiki/Online/Nintendo_Network/NEX/Types#Data
export default class Data extends Structure {
	public get typeName(): string {
		return className;
	}

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};
	}
}
