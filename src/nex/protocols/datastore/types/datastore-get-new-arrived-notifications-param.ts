import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreGetNewArrivedNotificationsParam';

export default class DataStoreGetNewArrivedNotificationsParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

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
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.lastNotificationID = this.lastNotificationID;
		json.__fields.limit = this.limit;

		return json;
	}
}
