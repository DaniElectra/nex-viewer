import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import RVBuffer from '@/nex/types/buffer';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RatingRankData';

export default class RatingRankData extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private principalID = new PID();
	private uniqueID = new UInt64();
	private order = new UInt32();
	private category = new UInt32();
	private score = new UInt32();
	private unknown1 = new UInt32();
	private unknown2 = new UInt32();
	private unknown3 = new UInt32();
	private commonData = new RVBuffer();
	private updateTime = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.principalID.extractFrom(stream);
		this.uniqueID.extractFrom(stream);
		this.order.extractFrom(stream);
		this.category.extractFrom(stream);
		this.score.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.commonData.extractFrom(stream);
		this.updateTime.extractFrom(stream);
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

		json.__fields.principalID = this.principalID;
		json.__fields.uniqueID = this.uniqueID;
		json.__fields.order = this.order;
		json.__fields.category = this.category;
		json.__fields.score = this.score;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.unknown3 = this.unknown3;
		json.__fields.commonData = this.commonData;
		json.__fields.updateTime = this.updateTime;

		return json;
	}
}
