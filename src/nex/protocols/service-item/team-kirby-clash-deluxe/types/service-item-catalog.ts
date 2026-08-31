import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import ServiceItemListItem from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-list-item';
import Bool from '@/nex/types/bool';
import ServiceItemAmount from '@/nex/protocols/service-item/team-kirby-clash-deluxe/types/service-item-amount';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ServiceItemCatalog';

export default class ServiceItemCatalog extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private totalSize = new UInt32();
	private offset = new UInt32();
	private listItems = new List(new ServiceItemListItem());
	private isBalanceAvailable = new Bool();
	private balance = new ServiceItemAmount();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.totalSize.extractFrom(stream);
		this.offset.extractFrom(stream);
		this.listItems.extractFrom(stream);
		this.isBalanceAvailable.extractFrom(stream);
		this.balance.extractFrom(stream);
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
		json.__fields.listItems = this.listItems;
		json.__fields.isBalanceAvailable = this.isBalanceAvailable;
		json.__fields.balance = this.balance;

		return json;
	}
}
