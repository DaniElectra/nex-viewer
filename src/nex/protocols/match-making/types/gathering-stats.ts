import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import Float from '@/nex/types/float';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GatheringStats';

export default class GatheringStats extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private m_pidParticipant = new PID();
	private m_uiFlags = new UInt32();
	private m_lstValues = new List(new Float());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_pidParticipant.extractFrom(stream);
		this.m_uiFlags.extractFrom(stream);
		this.m_lstValues.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				m_pidParticipant: this.m_pidParticipant,
				m_uiFlags: this.m_uiFlags,
				m_lstValues: this.m_lstValues
			}
		};
	}
}
