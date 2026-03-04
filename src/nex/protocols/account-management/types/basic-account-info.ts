import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'BasicAccountInfo';

export default class BasicAccountInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

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
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				m_pidOwner: this.m_pidOwner,
				m_strName: this.m_strName
			}
		};
	}
}
