import DDLClass from '@/nex/types/ddl-class';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import GlobalTradeStationRecordKey from '@/nex/protocols/datastore/pokemon-generation-7/types/global-trade-station-record-key';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationUploadPokemonParam';

export default class GlobalTradeStationUploadPokemonParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private prepareUploadKey = new GlobalTradeStationRecordKey();
	private period = new UInt16();
	private indexData = new QBuffer();
	private pokemonData = new QBuffer();
	private signature = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.prepareUploadKey.extractFrom(stream);
		this.period.extractFrom(stream);
		this.indexData.extractFrom(stream);
		this.pokemonData.extractFrom(stream);
		this.signature.extractFrom(stream);
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

		json.__fields.prepareUploadKey = this.prepareUploadKey;
		json.__fields.period = this.period;
		json.__fields.indexData = this.indexData;
		json.__fields.pokemonData = this.pokemonData;
		json.__fields.signature = this.signature;

		return json;
	}
}
