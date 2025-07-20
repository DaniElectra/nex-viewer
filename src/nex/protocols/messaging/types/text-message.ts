import UserMessage from '@/nex/protocols/messaging/types/user-message';
import RVString from '@/nex/types/string';
import type NEXByteStream from '@/nex/byte-stream';

export default class TextMessage extends UserMessage {
	public get typeName(): string {
		return 'TextMessage';
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
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				m_strTextBody: this.m_strTextBody
			}
		};
	}
}
