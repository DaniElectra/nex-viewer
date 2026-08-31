import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FestivalUploadScoreParam';

export default class FestivalUploadScoreParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private uniqueId = new UInt64();
	private region = new UInt8();
	private festivalId = new UInt32();
	private teamId = new UInt8();
	private score = new UInt32();
	private battleGatheringId = new UInt32();
	private battleResult = new UInt32();
	private applicationBuffer = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.uniqueId.extractFrom(stream);
		this.region.extractFrom(stream);
		this.festivalId.extractFrom(stream);
		this.teamId.extractFrom(stream);
		this.score.extractFrom(stream);
		this.battleGatheringId.extractFrom(stream);
		this.battleResult.extractFrom(stream);
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

		json.__fields.uniqueId = this.uniqueId;
		json.__fields.region = this.region;
		json.__fields.festivalId = this.festivalId;
		json.__fields.teamId = this.teamId;
		json.__fields.score = this.score;
		json.__fields.battleGatheringId = this.battleGatheringId;
		json.__fields.battleResult = this.battleResult;
		json.__fields.applicationBuffer = this.applicationBuffer;

		return json;
	}
}
