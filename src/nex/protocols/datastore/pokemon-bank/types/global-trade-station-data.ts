import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import QBuffer from '@/nex/types/qbuffer';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GlobalTradeStationData';

export default class GlobalTradeStationData extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataId = new UInt64();
	private ownerId = new PID();
	private updatedTime = new DateTime();
	private indexData = new QBuffer();
	private version = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataId.extractFrom(stream);
		this.ownerId.extractFrom(stream);
		this.updatedTime.extractFrom(stream);
		this.indexData.extractFrom(stream);
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

		json.__fields.dataId = this.dataId;
		json.__fields.ownerId = this.ownerId;
		json.__fields.updatedTime = this.updatedTime;
		json.__fields.indexData = this.indexData;
		json.__fields.version = this.version;

		return json;
	}
}
