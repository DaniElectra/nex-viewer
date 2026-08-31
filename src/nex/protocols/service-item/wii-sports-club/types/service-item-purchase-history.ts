import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import ServiceItemTransaction from '@/nex/protocols/service-item/wii-sports-club/types/service-item-transaction';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemPurchaseHistory';

export default class ServiceItemPurchaseHistory extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private totalSize = new UInt32();
	private offset = new UInt32();
	private transactions = new List(new ServiceItemTransaction());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.totalSize.extractFrom(stream);
		this.offset.extractFrom(stream);
		this.transactions.extractFrom(stream);
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

		json.__fields.totalSize = this.totalSize;
		json.__fields.offset = this.offset;
		json.__fields.transactions = this.transactions;

		return json;
	}
}
