import DDLClass from '@/nex/types/ddl-class';
import Int8 from '@/nex/types/int8';
import DataStoreRatingInitParam from '@/nex/protocols/datastore/types/datastore-rating-init-param';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreRatingInitParamWithSlot';

export default class DataStoreRatingInitParamWithSlot extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private slot = new Int8();
	private param = new DataStoreRatingInitParam();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.slot.extractFrom(stream);
		this.param.extractFrom(stream);
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
		json.__fields.param = this.param;

		return json;
	}
}
