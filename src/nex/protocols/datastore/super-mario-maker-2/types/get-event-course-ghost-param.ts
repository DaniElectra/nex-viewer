import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GetEventCourseGhostParam';

export default class GetEventCourseGhostParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private approximateTime = new UInt32();
	private numberOfGhosts = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.approximateTime.extractFrom(stream);
		this.numberOfGhosts.extractFrom(stream);
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
		json.__fields.approximateTime = this.approximateTime;
		json.__fields.numberOfGhosts = this.numberOfGhosts;

		return json;
	}
}
