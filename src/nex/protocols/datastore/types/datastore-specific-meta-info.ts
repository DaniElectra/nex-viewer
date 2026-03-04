import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreSpecificMetaInfo';

export default class DataStoreSpecificMetaInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private ownerID = new PID();
	private size = new UInt32();
	private dataType = new UInt16();
	private version = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.ownerID.extractFrom(stream);
		this.size.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.version.extractFrom(stream);
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
		json.__fields.ownerID = this.ownerID;
		json.__fields.size = this.size;
		json.__fields.dataType = this.dataType;
		json.__fields.version = this.version;

		return json;
	}
}
