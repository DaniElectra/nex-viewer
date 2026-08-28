import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import List from '@/nex/types/list';
import QBuffer from '@/nex/types/qbuffer';
import RVString from '@/nex/types/string';
import SimpleSearchDateTimeAttribute from '@/nex/protocols/matchmake-extension/mario-kart-8/types/simple-search-date-time-attribute';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'SimpleSearchObject';

export default class SimpleSearchObject extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private objectID = new UInt32();
	private ownerPID = new PID();
	private attributes = new List(new UInt32());
	private metadata = new QBuffer();
	private communityID = new UInt32();
	private communityCode = new RVString();
	private datetimeAttribute = new SimpleSearchDateTimeAttribute();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.objectID.extractFrom(stream);
		this.ownerPID.extractFrom(stream);
		this.attributes.extractFrom(stream);
		this.metadata.extractFrom(stream);
		this.communityID.extractFrom(stream);
		this.communityCode.extractFrom(stream);
		this.datetimeAttribute.extractFrom(stream);
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
		json.__fields.ownerPID = this.ownerPID;
		json.__fields.attributes = this.attributes;
		json.__fields.metadata = this.metadata;
		json.__fields.communityID = this.communityID;
		json.__fields.communityCode = this.communityCode;
		json.__fields.datetimeAttribute = this.datetimeAttribute;

		return json;
	}
}
