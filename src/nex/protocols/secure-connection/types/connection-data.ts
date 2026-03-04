import Structure from '@/nex/types/structure';
import StationURL from '@/nex/types/station-url';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'ConnectionData';

export default class ConnectionData extends Structure {
	public get typeName(): string {
		return className;
	}

	private m_StationUrl = new StationURL();
	private m_ConnectionID = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_StationUrl.extractFrom(stream);
		this.m_ConnectionID.extractFrom(stream);
	}

	public new(): ConnectionData {
		return new ConnectionData();
	}

	public toJSON(): Record<string, any> {
		return {
			__version: this.structureVersion,
			__displayTypeName: className,
			__typeName: className,
			__fields: {
				m_StationUrl: this.m_StationUrl,
				m_ConnectionID: this.m_ConnectionID
			}
		};
	}
}
