import * as semver from 'compare-versions';
import Structure from '@/nex/types/structure';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt16 from '@/nex/types/uint16';
import DateTime from '@/nex/types/datetime';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import ResultRange from '@/nex/types/result-range';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

export default class DataStoreSearchParam extends Structure {
	public readonly typeName = 'DataStoreSearchParam';

	private searchTarget = new UInt8();
	private ownerIDs = new List(new PID());
	private ownerType = new UInt8();
	private destinationIDs = new List(new PID());
	private dataType = new UInt16();
	private createdAfter = new DateTime();
	private createdBefore = new DateTime();
	private updatedAfter = new DateTime();
	private updatedBefore = new DateTime();
	private referDataID = new UInt32();
	private tags = new List(new RVString());
	private resultOrderColumn = new UInt8();
	private resultOrder = new UInt8();
	private resultRange = new ResultRange();
	private resultOption = new UInt8();
	private minimalRatingFrequency = new UInt32();
	private useCache?: Bool; // * Revision 1 or NEX v4.0.0
	private totalCountEnabled?: Bool; // * Revision 3 or NEX v4.0.0
	private dataTypes?: List<UInt16>; // * Revision 2 or NEX v4.0.0

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.searchTarget.extractFrom(stream);
		this.ownerIDs.extractFrom(stream);
		this.ownerType.extractFrom(stream);
		this.destinationIDs.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.createdAfter.extractFrom(stream);
		this.createdBefore.extractFrom(stream);
		this.updatedAfter.extractFrom(stream);
		this.updatedBefore.extractFrom(stream);
		this.referDataID.extractFrom(stream);
		this.tags.extractFrom(stream);
		this.resultOrderColumn.extractFrom(stream);
		this.resultOrder.extractFrom(stream);
		this.resultRange.extractFrom(stream);
		this.resultOption.extractFrom(stream);
		this.minimalRatingFrequency.extractFrom(stream);

		if (this.structureVersion >= 1 || semver.satisfies(stream.title.libraryVersions.datastore, '>=4.0.0')) {
			this.useCache = new Bool();
			this.useCache.extractFrom(stream);
		}

		if (this.structureVersion >= 3 || semver.satisfies(stream.title.libraryVersions.datastore, '>=4.0.0')) {
			this.totalCountEnabled = new Bool();
			this.totalCountEnabled.extractFrom(stream);
		}

		if (this.structureVersion >= 2 || semver.satisfies(stream.title.libraryVersions.datastore, '>=4.0.0')) {
			this.dataTypes = new List(new UInt16());
			this.dataTypes.extractFrom(stream);
		}
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {}
		};

		json.__fields.searchTarget = this.searchTarget;
		json.__fields.ownerIDs = this.ownerIDs;
		json.__fields.ownerType = this.ownerType;
		json.__fields.destinationIDs = this.destinationIDs;
		json.__fields.dataType = this.dataType;
		json.__fields.createdAfter = this.createdAfter;
		json.__fields.createdBefore = this.createdBefore;
		json.__fields.updatedAfter = this.updatedAfter;
		json.__fields.updatedBefore = this.updatedBefore;
		json.__fields.referDataID = this.referDataID;
		json.__fields.tags = this.tags;
		json.__fields.resultOrderColumn = this.resultOrderColumn;
		json.__fields.resultOrder = this.resultOrder;
		json.__fields.resultRange = this.resultRange;
		json.__fields.resultOption = this.resultOption;
		json.__fields.minimalRatingFrequency = this.minimalRatingFrequency;

		if (this.useCache !== undefined) {
			json.__fields.useCache = this.useCache;
		}

		if (this.totalCountEnabled !== undefined) {
			json.__fields.totalCountEnabled = this.totalCountEnabled;
		}

		if (this.dataTypes !== undefined) {
			json.__fields.dataTypes = this.dataTypes;
		}

		return json;
	}
}
