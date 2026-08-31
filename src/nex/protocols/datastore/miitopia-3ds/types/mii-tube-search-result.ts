import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import MiiTubeMiiInfo from '@/nex/protocols/datastore/miitopia-3ds/types/mii-tube-mii-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MiiTubeSearchResult';

export default class MiiTubeSearchResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private result = new List(new MiiTubeMiiInfo());
	private count = new UInt32();
	private page = new UInt32();
	private hasNext = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.result.extractFrom(stream);
		this.count.extractFrom(stream);
		this.page.extractFrom(stream);
		this.hasNext.extractFrom(stream);
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

		json.__fields.result = this.result;
		json.__fields.count = this.count;
		json.__fields.page = this.page;
		json.__fields.hasNext = this.hasNext;

		return json;
	}
}
