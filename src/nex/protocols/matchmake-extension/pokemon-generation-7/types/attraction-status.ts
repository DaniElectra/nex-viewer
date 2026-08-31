import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import UInt16 from '@/nex/types/uint16';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'AttractionStatus';

export default class AttractionStatus extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private messageInterval = new UInt16();
	private operationFlag = new UInt8();
	private activePlayerInviteParam = new UInt16();
	private activePlayerJoinParam = new UInt16();
	private extraParams = new List(new UInt32());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.messageInterval.extractFrom(stream);
		this.operationFlag.extractFrom(stream);
		this.activePlayerInviteParam.extractFrom(stream);
		this.activePlayerJoinParam.extractFrom(stream);
		this.extraParams.extractFrom(stream);
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

		json.__fields.messageInterval = this.messageInterval;
		json.__fields.operationFlag = this.operationFlag;
		json.__fields.activePlayerInviteParam = this.activePlayerInviteParam;
		json.__fields.activePlayerJoinParam = this.activePlayerJoinParam;
		json.__fields.extraParams = this.extraParams;

		return json;
	}
}
