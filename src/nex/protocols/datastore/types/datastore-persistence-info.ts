import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import UInt16 from '@/nex/types/uint16';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStorePersistenceInfo extends Structure {
	public readonly typeName = 'DataStorePersistenceInfo';

	private ownerID = new PID();
	private persistenceSlotID = new UInt16();
	private dataID = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.ownerID.extractFrom(stream);
		this.persistenceSlotID.extractFrom(stream);
		this.dataID.extractFrom(stream);
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

		json.__fields.ownerID = this.ownerID;
		json.__fields.persistenceSlotID = this.persistenceSlotID;
		json.__fields.dataID = this.dataID;

		return json;
	}
}
