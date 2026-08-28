import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import List from '@/nex/types/list';
import DateTime from '@/nex/types/datetime';
import UInt8 from '@/nex/types/uint8';
import UInt64 from '@/nex/types/uint64';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'FestivalResult';

export default class FestivalResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private festivalId = new UInt32();
	private numParticipants = new UInt32();
	private teamParticipants = new List(new UInt32());
	private teamScores = new List(new UInt32());
	private updatedTime = new DateTime();
	private unknown?: UInt8; // * Revision 1
	private teamScores64Bit?: List<UInt64>; // * Revision 1

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.festivalId.extractFrom(stream);
		this.numParticipants.extractFrom(stream);
		this.teamParticipants.extractFrom(stream);
		this.teamScores.extractFrom(stream);
		this.updatedTime.extractFrom(stream);

		if (this.revision >= 1) {
			this.unknown = new UInt8();
			this.unknown.extractFrom(stream);

			this.teamScores64Bit = new List(new UInt64());
			this.teamScores64Bit.extractFrom(stream);
		}
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

		json.__fields.festivalId = this.festivalId;
		json.__fields.numParticipants = this.numParticipants;
		json.__fields.teamParticipants = this.teamParticipants;
		json.__fields.teamScores = this.teamScores;
		json.__fields.updatedTime = this.updatedTime;

		if (this.unknown !== undefined) {
			json.__fields.unknown = this.unknown;
		}

		if (this.teamScores64Bit !== undefined) {
			json.__fields.teamScores64Bit = this.teamScores64Bit;
		}

		return json;
	}
}
