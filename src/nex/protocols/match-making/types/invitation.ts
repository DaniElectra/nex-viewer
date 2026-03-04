import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GatheringStats';

export default class GatheringStats extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private m_idGathering = new UInt32();
	private m_idGuest = new UInt32();
	private m_strMessage = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_idGathering.extractFrom(stream);
		this.m_idGuest.extractFrom(stream);
		this.m_strMessage.extractFrom(stream);
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
				m_idGuest: this.m_idGuest,
				m_strMessage: this.m_strMessage
			}
		};
	}
}
