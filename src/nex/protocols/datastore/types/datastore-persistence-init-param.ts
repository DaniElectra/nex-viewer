import Structure from '@/nex/types/structure';
import UInt16 from '@/nex/types/uint16';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStorePersistenceInitParam';

export default class DataStorePersistenceInitParam extends Structure {
	public get typeName(): string {
		return className;
	}

	private persistenceSlotID = new UInt16();
	private deleteLastObject = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.persistenceSlotID.extractFrom(stream);
		this.deleteLastObject.extractFrom(stream);
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

		json.__fields.persistenceSlotID = this.persistenceSlotID;
		json.__fields.deleteLastObject = this.deleteLastObject;

		return json;
	}
}
