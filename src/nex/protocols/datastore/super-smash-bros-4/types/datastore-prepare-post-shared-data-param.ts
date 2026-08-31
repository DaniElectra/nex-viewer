import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import RVBuffer from '@/nex/types/buffer';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import QBuffer from '@/nex/types/qbuffer';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStorePreparePostSharedDataParam';

export default class DataStorePreparePostSharedDataParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataType = new UInt8();
	private region = new UInt8();
	private attribute1 = new UInt8();
	private attribute2 = new UInt8();
	private fighter = new RVBuffer();// * This is a UInt8 in DataStoreSearchSharedDataParam?
	private size = new UInt32();
	private comment = new RVString();
	private metaBinary = new QBuffer();
	private extraData = new List(new RVString());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataType.extractFrom(stream);
		this.region.extractFrom(stream);
		this.attribute1.extractFrom(stream);
		this.attribute2.extractFrom(stream);
		this.fighter.extractFrom(stream);
		this.size.extractFrom(stream);
		this.comment.extractFrom(stream);
		this.metaBinary.extractFrom(stream);
		this.extraData.extractFrom(stream);
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
		json.__fields.region = this.region;
		json.__fields.attribute1 = this.attribute1;
		json.__fields.attribute2 = this.attribute2;
		json.__fields.fighter = this.fighter;
		json.__fields.size = this.size;
		json.__fields.comment = this.comment;
		json.__fields.metaBinary = this.metaBinary;
		json.__fields.extraData = this.extraData;

		return json;
	}
}
