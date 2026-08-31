import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import UInt64 from '@/nex/types/uint64';
import PID from '@/nex/types/pid';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'MatchmakeRefereeStats';

export default class MatchmakeRefereeStats extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private uniqueId = new UInt64();
	private category = new UInt32();
	private pid = new PID();
	private recentDisconnection = new UInt32();
	private recentViolation = new UInt32();
	private recentMismatch = new UInt32();
	private recentWin = new UInt32();
	private recentLoss = new UInt32();
	private recentDraw = new UInt32();
	private totalDisconnect = new UInt32();
	private totalViolation = new UInt32();
	private totalMismatch = new UInt32();
	private totalWin = new UInt32();
	private totalLoss = new UInt32();
	private totalDraw = new UInt32();
	private ratingValue = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.uniqueId.extractFrom(stream);
		this.category.extractFrom(stream);
		this.pid.extractFrom(stream);
		this.recentDisconnection.extractFrom(stream);
		this.recentViolation.extractFrom(stream);
		this.recentMismatch.extractFrom(stream);
		this.recentWin.extractFrom(stream);
		this.recentLoss.extractFrom(stream);
		this.recentDraw.extractFrom(stream);
		this.totalDisconnect.extractFrom(stream);
		this.totalViolation.extractFrom(stream);
		this.totalMismatch.extractFrom(stream);
		this.totalWin.extractFrom(stream);
		this.totalLoss.extractFrom(stream);
		this.totalDraw.extractFrom(stream);
		this.ratingValue.extractFrom(stream);
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
		json.__fields.category = this.category;
		json.__fields.pid = this.pid;
		json.__fields.recentDisconnection = this.recentDisconnection;
		json.__fields.recentViolation = this.recentViolation;
		json.__fields.recentMismatch = this.recentMismatch;
		json.__fields.recentWin = this.recentWin;
		json.__fields.recentLoss = this.recentLoss;
		json.__fields.recentDraw = this.recentDraw;
		json.__fields.totalDisconnect = this.totalDisconnect;
		json.__fields.totalViolation = this.totalViolation;
		json.__fields.totalMismatch = this.totalMismatch;
		json.__fields.totalWin = this.totalWin;
		json.__fields.totalLoss = this.totalLoss;
		json.__fields.totalDraw = this.totalDraw;
		json.__fields.ratingValue = this.ratingValue;

		return json;
	}
}
