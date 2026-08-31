import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CompetitionRankingUploadScoreParam';

export default class CompetitionRankingUploadScoreParam extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private id = new UInt32();
	private seasonID = new UInt32();
	private unknown = new UInt32();
	private score = new UInt32();
	private teamID = new UInt8();
	private teamScore = new UInt32();
	private isFirstUpload = new Bool();
	private metadata = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.id.extractFrom(stream);
		this.seasonID.extractFrom(stream);
		this.unknown.extractFrom(stream);
		this.score.extractFrom(stream);
		this.teamID.extractFrom(stream);
		this.teamScore.extractFrom(stream);
		this.isFirstUpload.extractFrom(stream);
		this.metadata.extractFrom(stream);
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

		json.__fields.id = this.id;
		json.__fields.seasonID = this.seasonID;
		json.__fields.unknown = this.unknown;
		json.__fields.score = this.score;
		json.__fields.teamID = this.teamID;
		json.__fields.teamScore = this.teamScore;
		json.__fields.isFirstUpload = this.isFirstUpload;
		json.__fields.metadata = this.metadata;

		return json;
	}
}
