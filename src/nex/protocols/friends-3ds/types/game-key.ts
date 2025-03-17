import Data from '@/nex/types/data';
import UInt64 from '@/nex/types/uint64';
import UInt16 from '@/nex/types/uint16';
import type NEXByteStream from '@/nex/byte-stream';

export default class GameKey extends Data {
	public get typeName(): string {
		return 'GameKey';
	}

	private m_gameCode = new UInt64();
	private m_gameVersion = new UInt16();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_gameCode.extractFrom(stream);
		this.m_gameVersion.extractFrom(stream);
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
				m_gameCode: this.m_gameCode,
				m_gameVersion: this.m_gameVersion
			}
		};
	}
}