import Structure from '@/nex/types/structure';
import UInt64 from '@/nex/types/uint64';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreGetNewArrivedNotificationsParam extends Structure {
	public readonly typeName = 'DataStoreGetNewArrivedNotificationsParam';

	private lastNotificationID = new UInt64();
	private limit = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.lastNotificationID.extractFrom(stream);
		this.limit.extractFrom(stream);
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

		json.__fields.lastNotificationID = this.lastNotificationID;
		json.__fields.limit = this.limit;

		return json;
	}
}
