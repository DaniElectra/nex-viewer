import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import UInt16 from '@/nex/types/uint16';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreReqGetAdditionalMeta';

export default class DataStoreReqGetAdditionalMeta extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private ownerID = new PID();
	private dataType = new UInt16();
	private version = new UInt16();
	private metaBinary = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.ownerID.extractFrom(stream);
		this.dataType.extractFrom(stream);
		this.version.extractFrom(stream);
		this.metaBinary.extractFrom(stream);
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

		json.__fields.ownerID = this.ownerID;
		json.__fields.dataType = this.dataType;
		json.__fields.version = this.version;
		json.__fields.metaBinary = this.metaBinary;

		return json;
	}
}
