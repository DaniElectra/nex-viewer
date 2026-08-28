import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import UInt8 from '@/nex/types/uint8';
import GlobalTradeStationData from '@/nex/protocols/datastore/pokemon-generation-7/types/global-trade-station-data';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationSearchPokemonResult';

export default class GlobalTradeStationSearchPokemonResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private totalCount = new UInt32();
	private result = new List(new GlobalTradeStationData());
	private totalCountType = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.totalCount.extractFrom(stream);
		this.result.extractFrom(stream);
		this.totalCountType.extractFrom(stream);
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

		json.__fields.totalCount = this.totalCount;
		json.__fields.result = this.result;
		json.__fields.totalCountType = this.totalCountType;

		return json;
	}
}
