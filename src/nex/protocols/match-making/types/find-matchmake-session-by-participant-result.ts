import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import MatchmakeSession from '@/nex/protocols/match-making/types/matchmake-session';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FindMatchmakeSessionByParticipantResult';

export default class FindMatchmakeSessionByParticipantResult extends Structure {
	public get typeName(): string {
		return className;
	}

	private m_principalId = new PID();
	private m_session = new MatchmakeSession();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_principalId.extractFrom(stream);
		this.m_session.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				m_principalId: this.m_principalId,
				m_session: this.m_session
			}
		};
	}
}
