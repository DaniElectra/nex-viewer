import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import AnyDataHolder from '@/nex/types/any-data-holder';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'PlayingSession';

export default class PlayingSession extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private m_PrincipalId = new PID();
	private m_Gathering = new AnyDataHolder();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_PrincipalId.extractFrom(stream);
		this.m_Gathering.extractFrom(stream);
	}

	public new(): PlayingSession {
		return new PlayingSession();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				m_PrincipalId: this.m_PrincipalId,
				m_Gathering: this.m_Gathering
			}
		};
	}
}
