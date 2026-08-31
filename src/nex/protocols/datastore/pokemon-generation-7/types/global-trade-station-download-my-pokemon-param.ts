import DDLClass from '@/nex/types/ddl-class';
import GlobalTradeStationRecordKey from '@/nex/protocols/datastore/pokemon-generation-7/types/global-trade-station-record-key';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationDownloadMyPokemonParam';

export default class GlobalTradeStationDownloadMyPokemonParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private prepareUploadKey = new GlobalTradeStationRecordKey();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

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

		json.__fields.prepareUploadKey = this.prepareUploadKey;

		return json;
	}
}
