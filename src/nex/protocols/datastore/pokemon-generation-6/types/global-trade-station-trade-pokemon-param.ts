import DDLClass from '@/nex/types/ddl-class';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import Bool from '@/nex/types/bool';
import GlobalTradeStationTradeKey from '@/nex/protocols/datastore/pokemon-generation-6/types/global-trade-station-trade-key';
import GlobalTradeStationRecordKey from '@/nex/protocols/datastore/pokemon-generation-6/types/global-trade-station-record-key';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationTradePokemonParam';

export default class GlobalTradeStationTradePokemonParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private tradeKey = new GlobalTradeStationTradeKey();
	private prepareTradeKey = new GlobalTradeStationRecordKey();
	private prepareUploadKey = new GlobalTradeStationRecordKey();
	private period = new UInt16();
	private indexData = new QBuffer();
	private pokemonData = new QBuffer();
	private signature = new QBuffer();
	private needData = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.tradeKey.extractFrom(stream);
		this.prepareTradeKey.extractFrom(stream);
		this.prepareUploadKey.extractFrom(stream);
		this.period.extractFrom(stream);
		this.indexData.extractFrom(stream);
		this.pokemonData.extractFrom(stream);
		this.signature.extractFrom(stream);
		this.needData.extractFrom(stream);
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
		json.__fields.prepareTradeKey = this.prepareTradeKey;
		json.__fields.prepareUploadKey = this.prepareUploadKey;
		json.__fields.period = this.period;
		json.__fields.indexData = this.indexData;
		json.__fields.pokemonData = this.pokemonData;
		json.__fields.signature = this.signature;
		json.__fields.needData = this.needData;

		return json;
	}
}
