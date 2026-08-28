import DDLClass from '@/nex/types/ddl-class';
import RVString from '@/nex/types/string';
import DateTime from '@/nex/types/datetime';
import UInt32 from '@/nex/types/uint32';
import ServiceItemAmount from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-amount';
import ServiceItemLimitation from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-limitation';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemTransaction';

export default class ServiceItemTransaction extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private transactionId = new RVString();
	private extTransactionId = new RVString();
	private time = new DateTime();
	private transactionType = new UInt32();
	private transactionDescription = new RVString();
	private transactionAmount = new ServiceItemAmount();
	private itemCode = new RVString();
	private referenceId = new RVString();
	private limitation = new ServiceItemLimitation();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.transactionId.extractFrom(stream);
		this.extTransactionId.extractFrom(stream);
		this.time.extractFrom(stream);
		this.transactionType.extractFrom(stream);
		this.transactionDescription.extractFrom(stream);
		this.transactionAmount.extractFrom(stream);
		this.itemCode.extractFrom(stream);
		this.referenceId.extractFrom(stream);
		this.limitation.extractFrom(stream);
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
		json.__fields.time = this.time;
		json.__fields.transactionType = this.transactionType;
		json.__fields.transactionDescription = this.transactionDescription;
		json.__fields.transactionAmount = this.transactionAmount;
		json.__fields.itemCode = this.itemCode;
		json.__fields.referenceId = this.referenceId;
		json.__fields.limitation = this.limitation;

		return json;
	}
}
