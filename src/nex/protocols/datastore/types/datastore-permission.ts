import Structure from '@/nex/types/structure';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStorePermission';

export default class DataStorePermission extends Structure {
	public get typeName(): string {
		return className;
	}

	private permission = new UInt8();
	private recipientIDs = new List(new PID());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.permission.extractFrom(stream);
		this.recipientIDs.extractFrom(stream);
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

		json.__fields.permission = this.permission;
		json.__fields.recipientIDs = this.recipientIDs;

		return json;
	}
}
