import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import ServiceItemAmount from '@/nex/protocols/service-item/wii-sports-club/types/service-item-amount';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemPurchaceInfo';

export default class ServiceItemPurchaceInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private transactionId = new RVString();
	private extTransactionId = new RVString();
	private itemCode = new RVString();
	private postBalance = new ServiceItemAmount();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.transactionId.extractFrom(stream);
		this.extTransactionId.extractFrom(stream);
		this.itemCode.extractFrom(stream);
		this.postBalance.extractFrom(stream);
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

		json.__fields.transactionId = this.transactionId;
		json.__fields.extTransactionId = this.extTransactionId;
		json.__fields.itemCode = this.itemCode;
		json.__fields.postBalance = this.postBalance;

		return json;
	}
}
