import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import PID from '@/nex/types/pid';
import ResultRange from '@/nex/types/result-range';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreSearchSharedDataParam';

export default class DataStoreSearchSharedDataParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataType = new UInt8();
	private owner = new PID();
	private region = new UInt8();
	private attribute1 = new UInt8();
	private attribute2 = new UInt8();
	private fighter = new UInt8(); // * This is a Buffer in DataStorePreparePostSharedDataParam?
	private resultRange = new ResultRange();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataType.extractFrom(stream);
		this.owner.extractFrom(stream);
		this.region.extractFrom(stream);
		this.attribute1.extractFrom(stream);
		this.attribute2.extractFrom(stream);
		this.fighter.extractFrom(stream);
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

		json.__fields.dataType = this.dataType;
		json.__fields.owner = this.owner;
		json.__fields.region = this.region;
		json.__fields.attribute1 = this.attribute1;
		json.__fields.attribute2 = this.attribute2;
		json.__fields.fighter = this.fighter;
		json.__fields.resultRange = this.resultRange;

		return json;
	}
}
