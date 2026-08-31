import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'RelationshipData';

export default class RelationshipData extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private m_pid = new PID();
	private m_strName = new RVString();
	private m_byRelationship = new UInt8();
	private m_uiDetails = new UInt32();
	private m_byStatus = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_pid.extractFrom(stream);
		this.m_strName.extractFrom(stream);
		this.m_byRelationship.extractFrom(stream);
		this.m_uiDetails.extractFrom(stream);
		this.m_byStatus.extractFrom(stream);
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

		json.__fields.m_pid = this.m_pid;
		json.__fields.m_strName = this.m_strName;
		json.__fields.m_byRelationship = this.m_byRelationship;
		json.__fields.m_uiDetails = this.m_uiDetails;
		json.__fields.m_byStatus = this.m_byStatus;

		return json;
	}
}
