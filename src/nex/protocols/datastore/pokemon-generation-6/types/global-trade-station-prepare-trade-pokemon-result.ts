import DDLClass from '@/nex/types/ddl-class';
import GlobalTradeStationDownloadPokemonResult from '@/nex/protocols/datastore/pokemon-generation-6/types/global-trade-station-download-pokemon-result';
import GlobalTradeStationRecordKey from '@/nex/protocols/datastore/pokemon-generation-6/types/global-trade-station-record-key';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationPrepareTradePokemonResult';

export default class GlobalTradeStationPrepareTradePokemonResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private result = new GlobalTradeStationDownloadPokemonResult();
	private prepareTradeKey = new GlobalTradeStationRecordKey();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.result.extractFrom(stream);
		this.prepareTradeKey.extractFrom(stream);
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
		json.__fields.prepareTradeKey = this.prepareTradeKey;

		return json;
	}
}
