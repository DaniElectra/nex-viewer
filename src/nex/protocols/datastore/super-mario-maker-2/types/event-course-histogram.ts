import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import RVMap from '@/nex/types/map';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'EventCourseHistogram';

export default class EventCourseHistogram extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private unknown1 = new UInt32();
	private unknown2 = new UInt32();
	private unknown3 = new UInt32();
	private histogramValues = new List(new UInt32());
	private medalTime = new RVMap(new UInt8(), new UInt32());
	private unknown4 = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.unknown3.extractFrom(stream);
		this.histogramValues.extractFrom(stream);
		this.medalTime.extractFrom(stream);
		this.unknown4.extractFrom(stream);
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

		json.__fields.dataID = this.dataID;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.unknown3 = this.unknown3;
		json.__fields.histogramValues = this.histogramValues;
		json.__fields.medalTime = this.medalTime;
		json.__fields.unknown4 = this.unknown4;

		return json;
	}
}
