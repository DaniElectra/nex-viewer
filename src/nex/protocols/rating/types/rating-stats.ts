import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import QBuffer from '@/nex/types/qbuffer';
import List from '@/nex/types/list';
import Float from '@/nex/types/float';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RatingStats';

export default class RatingStats extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private principalID = new PID();
	private uniqueID = new UInt64();
	private flags = new UInt32();
	private category = new UInt32();
	private reportData = new QBuffer();
	private values = new List(new Float());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.principalID.extractFrom(stream);
		this.uniqueID.extractFrom(stream);
		this.flags.extractFrom(stream);
		this.category.extractFrom(stream);
		this.reportData.extractFrom(stream);
		this.values.extractFrom(stream);
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
		json.__fields.flags = this.flags;
		json.__fields.category = this.category;
		json.__fields.reportData = this.reportData;
		json.__fields.values = this.values;

		return json;
	}
}
