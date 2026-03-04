import DDLClass from '@/nex/types/ddl-class';
import Int8 from '@/nex/types/int8';
import DataStoreRatingInfo from '@/nex/protocols/datastore/types/datastore-rating-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreRatingInfoWithSlot';

export default class DataStoreRatingInfoWithSlot extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private slot = new Int8();
	private rating = new DataStoreRatingInfo();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.slot.extractFrom(stream);
		this.rating.extractFrom(stream);
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

		json.__fields.slot = this.slot;
		json.__fields.rating = this.rating;

		return json;
	}
}
