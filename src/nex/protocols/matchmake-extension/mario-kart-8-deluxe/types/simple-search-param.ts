import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import List from '@/nex/types/list';
import RVString from '@/nex/types/string';
import ResultRange from '@/nex/types/result-range';
import DateTime from '@/nex/types/datetime';
import SimpleSearchCondition from '@/nex/protocols/matchmake-extension/mario-kart-8-deluxe/types/simple-search-condition';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SimpleSearchParam';

export default class SimpleSearchParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private objectID = new UInt32();
	private owner = new PID();
	private conditions = new List(new SimpleSearchCondition());
	private code = new RVString();
	private resultRange = new ResultRange();
	private datetime = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.objectID.extractFrom(stream);
		this.owner.extractFrom(stream);
		this.conditions.extractFrom(stream);
		this.code.extractFrom(stream);
		this.resultRange.extractFrom(stream);
		this.datetime.extractFrom(stream);
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

		json.__fields.objectID = this.objectID;
		json.__fields.owner = this.owner;
		json.__fields.conditions = this.conditions;
		json.__fields.code = this.code;
		json.__fields.resultRange = this.resultRange;
		json.__fields.datetime = this.datetime;

		return json;
	}
}
