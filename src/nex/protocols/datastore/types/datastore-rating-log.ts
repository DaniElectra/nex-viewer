import DDLClass from '@/nex/types/ddl-class';
import Bool from '@/nex/types/bool';
import PID from '@/nex/types/pid';
import Int32 from '@/nex/types/int32';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreRatingLog';

export default class DataStoreRatingLog extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private isRated = new Bool();
	private pID = new PID();
	private ratingValue = new Int32();
	private lockExpirationTime = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.isRated.extractFrom(stream);
		this.pID.extractFrom(stream);
		this.ratingValue.extractFrom(stream);
		this.lockExpirationTime.extractFrom(stream);
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

		json.__fields.isRated = this.isRated;
		json.__fields.pID = this.pID;
		json.__fields.ratingValue = this.ratingValue;
		json.__fields.lockExpirationTime = this.lockExpirationTime;

		return json;
	}
}
