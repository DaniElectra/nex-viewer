import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreTouchObjectParam';

export default class DataStoreTouchObjectParam extends Structure {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private lockID = new UInt32();
	private accessPassword = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.lockID.extractFrom(stream);
		this.accessPassword.extractFrom(stream);
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

		json.__fields.dataID = this.dataID;
		json.__fields.lockID = this.lockID;
		json.__fields.accessPassword = this.accessPassword;

		return json;
	}
}
