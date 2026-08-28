import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import List from '@/nex/types/list';
import RVBuffer from '@/nex/types/buffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RankingData';

export default class RankingData extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private uniqueID = new UInt32();
	private pid = new PID();
	private order = new UInt32();
	private category!: List<UInt16> | UInt32;
	private scores = new List(new UInt32());
	private unknown1 = new UInt8();
	private unknown2 = new UInt32();
	private commonData = new RVBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.uniqueID.extractFrom(stream);
		this.pid.extractFrom(stream);
		this.order.extractFrom(stream);

		// * NEX 1 stores the category as a List<Uint16>, NEX 2 stores it as a Uint32
		if (Number(stream.title.libraryVersions.ranking.split('.')[0]) === 1) {
			this.category = new List(new UInt16());
		} else {
			this.category = new UInt32();
		}

		this.category.extractFrom(stream);

		this.scores.extractFrom(stream);
		this.unknown1.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.commonData.extractFrom(stream);
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

		json.__fields.uniqueID = this.uniqueID;
		json.__fields.pid = this.pid;
		json.__fields.order = this.order;
		json.__fields.category = this.category;
		json.__fields.scores = this.scores;
		json.__fields.unknown1 = this.unknown1;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.commonData = this.commonData;

		return json;
	}
}
