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
	private unknown2 = new UInt32();
	private datetime = new DateTime();
	private unknown3 = new UInt8();
	private metadata = new QBuffer();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.unknown1.extractFrom(stream);
		this.userID.extractFrom(stream);
		this.unknown2.extractFrom(stream);
		this.datetime.extractFrom(stream);
		this.unknown3.extractFrom(stream);
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

		json.__fields.unknown1 = this.unknown1;
		json.__fields.userID = this.userID;
		json.__fields.unknown2 = this.unknown2;
		json.__fields.datetime = this.datetime;
		json.__fields.unknown3 = this.unknown3;
		json.__fields.metadata = this.metadata;

		return json;
	}
}
