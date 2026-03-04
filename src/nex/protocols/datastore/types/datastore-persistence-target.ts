import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStorePersistenceTarget';

export default class DataStorePersistenceTarget extends Structure {
	public get typeName(): string {
		return className;
	}

	private ownerID = new PID();
	private persistenceSlotID = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.ownerID.extractFrom(stream);
		this.persistenceSlotID.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.ownerID = this.ownerID;
		json.__fields.persistenceSlotID = this.persistenceSlotID;

		return json;
	}
}
