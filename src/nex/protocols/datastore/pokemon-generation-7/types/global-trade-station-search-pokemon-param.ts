import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import DateTime from '@/nex/types/datetime';
import ResultRange from '@/nex/types/result-range';
import GlobalTradeStationRecordKey from '@/nex/protocols/datastore/pokemon-generation-7/types/global-trade-station-record-key';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationSearchPokemonParam';

export default class GlobalTradeStationSearchPokemonParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private prepareUploadKey = new GlobalTradeStationRecordKey();
	private conditions = new List(new UInt32());
	private resultOrderColumn = new UInt8();
	private resultOrder = new UInt8();
	private uploadedAfter = new DateTime();
	private uploadedBefore = new DateTime();
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.prepareUploadKey.extractFrom(stream);
		this.conditions.extractFrom(stream);
		this.resultOrderColumn.extractFrom(stream);
		this.resultOrder.extractFrom(stream);
		this.uploadedAfter.extractFrom(stream);
		this.uploadedBefore.extractFrom(stream);
		this.resultRange.extractFrom(stream);
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
		json.__fields.conditions = this.conditions;
		json.__fields.resultOrderColumn = this.resultOrderColumn;
		json.__fields.resultOrder = this.resultOrder;
		json.__fields.uploadedAfter = this.uploadedAfter;
		json.__fields.uploadedBefore = this.uploadedBefore;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
