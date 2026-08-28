import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationDownloadPokemonResult';

export default class GlobalTradeStationDownloadPokemonResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private indexData = new QBuffer();
	private pokemonData = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.indexData.extractFrom(stream);
		this.pokemonData.extractFrom(stream);
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

		json.__fields.dataId = this.dataId;
		json.__fields.indexData = this.indexData;
		json.__fields.pokemonData = this.pokemonData;

		return json;
	}
}
