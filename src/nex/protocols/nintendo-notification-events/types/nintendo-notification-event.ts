import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'NintendoNotificationEvent';

export default class NintendoNotificationEvent extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private m_uiType = new UInt32();
	private m_uiParam1 = new PID();
	private m_dataholder = new AnyDataHolder();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_uiType.extractFrom(stream);
		this.m_uiParam1.extractFrom(stream);
		this.m_dataholder.extractFrom(stream);
	}

	public new(): NintendoNotificationEvent {
		return new NintendoNotificationEvent();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				m_uiType: this.m_uiType,
				m_uiParam1: this.m_uiParam1,
				m_dataholder: this.m_dataholder
			}
		};
	}
}
