import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import GlobalTradeStationDownloadPokemonResult from '@/nex/protocols/datastore/pokemon-generation-6/types/global-trade-station-download-pokemon-result';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationTradePokemonResult';

export default class GlobalTradeStationTradePokemonResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private result = new GlobalTradeStationDownloadPokemonResult();
	private myDataId = new UInt64();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.result.extractFrom(stream);
		this.myDataId.extractFrom(stream);
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
		json.__fields.myDataId = this.myDataId;

		return json;
	}
}
