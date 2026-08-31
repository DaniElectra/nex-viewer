import * as semver from 'compare-versions';
import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

// * ONLY IMPLEMENTS THE 3DS AND WII U VERSION!
// * THE SWITCH USES A DIFFERENT STRUCTURE!
const className = 'NotificationEvent';

export default class NotificationEvent extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private m_pidSource = new UInt32();
	private m_uiType = new UInt32();
	private m_uiParam1 = new UInt32();
	private m_uiParam2 = new UInt32();
	private m_strParam = new RVString();
	private m_uiParam3?: UInt32; // * NEX 3.4

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_pidSource.extractFrom(stream);
		this.m_uiType.extractFrom(stream);
		this.m_uiParam1.extractFrom(stream);
		this.m_uiParam2.extractFrom(stream);
		this.m_strParam.extractFrom(stream);

		if (semver.satisfies(stream.title.libraryVersions.main, '>=3.4.0')) {
			this.m_uiParam3 = new UInt32();
			this.m_uiParam3.extractFrom(stream);
		}
	}

	public new(): NotificationEvent {
		return new NotificationEvent();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				m_pidSource: this.m_pidSource,
				m_uiType: this.m_uiType,
				m_uiParam1: this.m_uiParam1,
				m_uiParam2: this.m_uiParam2,
				m_strParam: this.m_strParam
			}
		};

		if (this.m_uiParam3 !== undefined) {
			json.__fields.m_uiParam3 = this.m_uiParam3;
		}

		return json;
	}
}
