import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import PID from '@/nex/types/pid';
import DateTime from '@/nex/types/datetime';
import UInt8 from '@/nex/types/uint8';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CompetitionRankingScoreData';

export default class CompetitionRankingScoreData extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private unknown1 = new UInt32();
	private userID = new PID();
	private score = new UInt32();
	private modifiedDate = new DateTime();
	private unknown2 = new UInt8();
	private applicationData = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.userID.extractFrom(stream);
		this.score.extractFrom(stream);
		this.modifiedDate.extractFrom(stream);
		this.unknown2.extractFrom(stream);
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
		json.__fields.userID = this.userID;
		json.__fields.score = this.score;
		json.__fields.modifiedDate = this.modifiedDate;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.applicationData = this.applicationData;

		return json;
	}
}
