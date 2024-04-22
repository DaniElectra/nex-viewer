import Structure from '@/nex/types/structure';
import type NEXByteStream from '@/nex/byte-stream';

// * Data has no fields itself.
// * This is the parent class for all types which are allowed in AnyDataHolder
export default class Data extends Structure {
	public readonly typeName = 'Data';

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);
	}

	public new(): Data {
		return new Data();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName
		};
	}
}