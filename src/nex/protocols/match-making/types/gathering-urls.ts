import Structure from '@/nex/types/structure';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import StationURL from '@/nex/types/station-url';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'GatheringURLs';

export default class GatheringURLs extends Structure {
	public get typeName(): string {
		return className;
	}

	private m_gid = new UInt32();
	private m_lstStationURLs = new List(new StationURL());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.m_gid.extractFrom(stream);
		this.m_lstStationURLs.extractFrom(stream);
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
				m_gid: this.m_gid,
				m_lstStationURLs: this.m_lstStationURLs
			}
		};
	}
}
