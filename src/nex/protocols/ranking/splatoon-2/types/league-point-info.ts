import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import RVString from '@/nex/types/string';
import UInt32 from '@/nex/types/uint32';
import RVMap from '@/nex/types/map';
import LeaguePlayerDetail from '@/nex/protocols/ranking/splatoon-2/types/league-player-detail';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'LeaguePointInfo';

export default class LeaguePointInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private tagId = new UInt64();
	private regionFlag = new UInt8();
	private leagueId = new RVString();
	private point = new UInt32();
	private tagMembers = new RVMap(new UInt64(), new LeaguePlayerDetail());
	private applicationBuffer = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.tagId.extractFrom(stream);
		this.regionFlag.extractFrom(stream);
		this.leagueId.extractFrom(stream);
		this.point.extractFrom(stream);
		this.tagMembers.extractFrom(stream);
		this.applicationBuffer.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		const json: Record<string, any> = {
			__version: this.revision,
			__displayTypeName: className,
			__typeName: className,
			__fields: {}
		};

		json.__fields.tagId = this.tagId;
		json.__fields.regionFlag = this.regionFlag;
		json.__fields.leagueId = this.leagueId;
		json.__fields.point = this.point;
		json.__fields.tagMembers = this.tagMembers;
		json.__fields.applicationBuffer = this.applicationBuffer;

		return json;
	}
}
