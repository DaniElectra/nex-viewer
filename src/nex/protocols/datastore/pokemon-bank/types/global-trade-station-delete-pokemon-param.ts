import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import GlobalTradeStationRecordKey from '@/nex/protocols/datastore/pokemon-bank/types/global-trade-station-record-key';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationDeletePokemonParam';

export default class GlobalTradeStationDeletePokemonParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private prepareUploadKey = new GlobalTradeStationRecordKey();
	private deleteFlag = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.prepareUploadKey.extractFrom(stream);
		this.deleteFlag.extractFrom(stream);
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
		json.__fields.deleteFlag = this.deleteFlag;

		return json;
	}
}
