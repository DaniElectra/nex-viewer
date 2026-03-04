import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DeletionEntry';

export default class DeletionEntry extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private m_idGathering = new UInt32();
	private m_pid = new PID();
	private m_uiReason = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_idGathering.extractFrom(stream);
		this.m_pid.extractFrom(stream);
		this.m_uiReason.extractFrom(stream);
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
				m_idGathering: this.m_idGathering,
				m_pid: this.m_pid,
				m_uiReason: this.m_uiReason
			}
		};
	}
}
