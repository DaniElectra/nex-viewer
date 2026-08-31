import DDLClass from '@/nex/types/ddl-class';
import List from '@/nex/types/list';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import MatchmakeBlockListParam from '@/nex/protocols/match-making/types/matchmake-block-list-param';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FindMatchmakeSessionByParticipantParam';

export default class FindMatchmakeSessionByParticipantParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private m_principalIdList = new List(new PID());
	private m_resultOptions = new UInt32();
	private m_blockListParam = new MatchmakeBlockListParam();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_principalIdList.extractFrom(stream);
		this.m_resultOptions.extractFrom(stream);
		this.m_blockListParam.extractFrom(stream);
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
				m_principalIdList: this.m_principalIdList,
				m_resultOptions: this.m_resultOptions,
				m_blockListParam: this.m_blockListParam
			}
		};
	}
}
