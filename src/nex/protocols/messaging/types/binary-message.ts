import UserMessage from '@/nex/protocols/messaging/types/user-message';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

export default class BinaryMessage extends UserMessage {
	public get typeName(): string {
		return 'BinaryMessage';
	}

	private m_binaryBody = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_binaryBody.extractFrom(stream);
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
				m_binaryBody: this.m_binaryBody
			}
		};
	}
}
