import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreNotificationV1';

export default class DataStoreNotificationV1 extends Structure {
	public get typeName(): string {
		return className;
	}

	private notificationID = new UInt64();
	private dataID = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.notificationID.extractFrom(stream);
		this.dataID.extractFrom(stream);
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

		json.__fields.notificationID = this.notificationID;
		json.__fields.dataID = this.dataID;

		return json;
	}
}
