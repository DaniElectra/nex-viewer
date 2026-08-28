import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import UInt32 from '@/nex/types/uint32';
import Int32 from '@/nex/types/int32';
import PID from '@/nex/types/pid';
import QBuffer from '@/nex/types/qbuffer';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MatchmakeRefereePersonalRoundResult';

export default class MatchmakeRefereePersonalRoundResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private pid = new PID();
	private personalRoundResultFlag = new UInt32();
	private roundWinLoss = new UInt32();
	private ratingValueChange = new Int32();
	private buffer = new QBuffer();
	private reportSummaryMode = new UInt8();
	private eventId = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.pid.extractFrom(stream);
		this.personalRoundResultFlag.extractFrom(stream);
		this.roundWinLoss.extractFrom(stream);
		this.ratingValueChange.extractFrom(stream);
		this.buffer.extractFrom(stream);
		this.reportSummaryMode.extractFrom(stream);
		this.eventId.extractFrom(stream);
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

		json.__fields.pid = this.pid;
		json.__fields.personalRoundResultFlag = this.personalRoundResultFlag;
		json.__fields.roundWinLoss = this.roundWinLoss;
		json.__fields.ratingValueChange = this.ratingValueChange;
		json.__fields.buffer = this.buffer;
		json.__fields.reportSummaryMode = this.reportSummaryMode;
		json.__fields.eventId = this.eventId;

		return json;
	}
}
