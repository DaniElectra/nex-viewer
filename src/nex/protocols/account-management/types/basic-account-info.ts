import Structure from '@/nex/types/structure';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

export default class BasicAccountInfo extends Structure {
	public readonly typeName = 'BasicAccountInfo';

	private m_pidOwner = new PID();
	private m_strName = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_pidOwner.extractFrom(stream);
		this.m_strName.extractFrom(stream);
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
				m_pidOwner: this.m_pidOwner,
				m_strName: this.m_strName
			}
		};
	}
}
