import DDLClass from '@/nex/types/ddl-class';
import GlobalTradeStationTradeKey from '@/nex/protocols/datastore/pokemon-bank/types/global-trade-station-trade-key';
import GlobalTradeStationRecordKey from '@/nex/protocols/datastore/pokemon-bank/types/global-trade-station-record-key';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationPrepareTradePokemonParam';

export default class GlobalTradeStationPrepareTradePokemonParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private tradeKey = new GlobalTradeStationTradeKey();
	private prepareUploadKey = new GlobalTradeStationRecordKey();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.tradeKey.extractFrom(stream);
		this.prepareUploadKey.extractFrom(stream);
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

		json.__fields.tradeKey = this.tradeKey;
		json.__fields.prepareUploadKey = this.prepareUploadKey;

		return json;
	}
}
