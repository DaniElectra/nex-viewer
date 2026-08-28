import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import ResultRange from '@/nex/types/result-range';
import UInt8 from '@/nex/types/uint8';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SearchCoursesAdvancedParam';

export default class SearchCoursesAdvancedParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private resultOption = new UInt32();
	private resultRange = new ResultRange();
	private preferCourseDifficulty = new UInt8();
	private preferGameSkinId = new UInt8();
	private preferSceneSetId = new UInt8();
	private preferTagIds = new List(new UInt8());
	private rejectRegionIds = new List(new UInt8());
	private sortType = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.resultOption.extractFrom(stream);
		this.resultRange.extractFrom(stream);
		this.preferCourseDifficulty.extractFrom(stream);
		this.preferGameSkinId.extractFrom(stream);
		this.preferSceneSetId.extractFrom(stream);
		this.preferTagIds.extractFrom(stream);
		this.rejectRegionIds.extractFrom(stream);
		this.sortType.extractFrom(stream);
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

		json.__fields.resultOption = this.resultOption;
		json.__fields.resultRange = this.resultRange;
		json.__fields.preferCourseDifficulty = this.preferCourseDifficulty;
		json.__fields.preferGameSkinId = this.preferGameSkinId;
		json.__fields.preferSceneSetId = this.preferSceneSetId;
		json.__fields.preferTagIds = this.preferTagIds;
		json.__fields.rejectRegionIds = this.rejectRegionIds;
		json.__fields.sortType = this.sortType;

		return json;
	}
}
