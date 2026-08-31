import UserMessage from '@/nex/protocols/messaging/types/user-message';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'TextMessage';

export default class TextMessage extends UserMessage {
	public get typeName(): string {
		return className;
	}

	private m_strTextBody = new RVString();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_strTextBody.extractFrom(stream);
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
				m_strTextBody: this.m_strTextBody
			}
		};
	}
}
