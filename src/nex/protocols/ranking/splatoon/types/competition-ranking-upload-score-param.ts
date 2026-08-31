import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt8 from '@/nex/types/uint8';
import Bool from '@/nex/types/bool';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CompetitionRankingUploadScoreParam';

export default class CompetitionRankingUploadScoreParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt32();
	private festivalID = new UInt32();
	private unknown2 = new UInt32();
	private score = new UInt32();
	private teamID = new UInt8();
	private teamScore = new UInt32();
	private isFirstUpload = new Bool();
	private applicationData = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.festivalID.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.score.extractFrom(stream);
		this.teamID.extractFrom(stream);
		this.teamScore.extractFrom(stream);
		this.isFirstUpload.extractFrom(stream);
		this.applicationData.extractFrom(stream);
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

		json.__fields.unknown1 = this.unknown1;
		json.__fields.festivalID = this.festivalID;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.score = this.score;
		json.__fields.teamID = this.teamID;
		json.__fields.teamScore = this.teamScore;
		json.__fields.isFirstUpload = this.isFirstUpload;
		json.__fields.applicationData = this.applicationData;

		return json;
	}
}
