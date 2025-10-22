import * as semver from 'compare-versions';
import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

export default class MessageRecipient extends Structure {
	public readonly typeName = 'MessageRecipient';

	private libraryVersion?: string;
	private m_idRecipient = new UInt32(); // * NEX <4.0
	private m_uiRecipientType = new UInt32();
	private m_principalId = new PID(); // * NEX 4.0
	private m_gatheringId = new UInt32(); // * NEX 4.0

	public extractFrom(stream: NEXByteStream): void {
		this.libraryVersion = stream.title.libraryVersions.messaging;
		this.extractHeaderFrom(stream);

		if (semver.satisfies(this.libraryVersion, '>=4.0.0')) {
			this.m_uiRecipientType.extractFrom(stream);
			this.m_principalId.extractFrom(stream);
			this.m_gatheringId.extractFrom(stream);
		} else {
			this.m_idRecipient.extractFrom(stream);
			this.m_uiRecipientType.extractFrom(stream);
		}
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): Record<string, any> {
		const json: Record<string, any> = {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {}
		};

		if (this.libraryVersion && semver.satisfies(this.libraryVersion, '>=4.0.0')) {
			json.__fields['m_uiRecipientType'] = this.m_uiRecipientType;
			json.__fields['m_principalId'] = this.m_principalId;
			json.__fields['m_gatheringId'] = this.m_gatheringId;
		} else {
			json.__fields['m_idRecipient'] = this.m_idRecipient;
			json.__fields['m_uiRecipientType'] = this.m_uiRecipientType;
		}

		return json;
	}
}
