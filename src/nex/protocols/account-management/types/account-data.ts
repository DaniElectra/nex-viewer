import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class AccountData extends Structure {
	public readonly typeName = 'AccountData';

	private m_pid = new PID();
	private m_strName = new RVString();
	private m_uiGroups = new UInt32();
	private m_strEmail = new RVString();
	private m_dtCreationDate = new DateTime();
	private m_dtEffectiveDate = new DateTime();
	private m_strNotEffectiveMsg = new RVString();
	private m_dtExpiryDate = new DateTime();
	private m_strExpiredMsg = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_pid.extractFrom(stream);
		this.m_strName.extractFrom(stream);
		this.m_uiGroups.extractFrom(stream);
		this.m_strEmail.extractFrom(stream);
		this.m_dtCreationDate.extractFrom(stream);
		this.m_dtEffectiveDate.extractFrom(stream);
		this.m_strNotEffectiveMsg.extractFrom(stream);
		this.m_dtExpiryDate.extractFrom(stream);
		this.m_strExpiredMsg.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_pid: this.m_pid,
				m_strName: this.m_strName,
				m_uiGroups: this.m_uiGroups,
				m_strEmail: this.m_strEmail,
				m_dtCreationDate: this.m_dtCreationDate,
				m_dtEffectiveDate: this.m_dtEffectiveDate,
				m_strNotEffectiveMsg: this.m_strNotEffectiveMsg,
				m_dtExpiryDate: this.m_dtExpiryDate,
				m_strExpiredMsg: this.m_strExpiredMsg
			}
		};
	}
}