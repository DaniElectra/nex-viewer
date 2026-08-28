import DDLClass from '@/nex/types/ddl-class';
import Bool from '@/nex/types/bool';
import GlobalTradeStationDownloadPokemonResult from '@/nex/protocols/datastore/pokemon-generation-7/types/global-trade-station-download-pokemon-result';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationDownloadMyPokemonResult';

export default class GlobalTradeStationDownloadMyPokemonResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private result = new GlobalTradeStationDownloadPokemonResult();
	private isTraded = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.result.extractFrom(stream);
		this.isTraded.extractFrom(stream);
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
		json.__fields.isTraded = this.isTraded;

		return json;
	}
}
