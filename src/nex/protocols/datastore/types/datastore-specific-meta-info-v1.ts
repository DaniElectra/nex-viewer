import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreSpecificMetaInfoV1 extends Structure {
	public readonly typeName = 'DataStoreSpecificMetaInfoV1';

	private dataID = new UInt32();
	private ownerID = new PID();
	private size = new UInt32();
	private dataType = new UInt16();
	private version = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.ownerID.extractFrom(stream);
		this.size.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.version.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {}
		};

		json.__fields.dataID = this.dataID;
		json.__fields.ownerID = this.ownerID;
		json.__fields.size = this.size;
		json.__fields.dataType = this.dataType;
		json.__fields.version = this.version;

		return json;
	}
}
