import DDLClass from '@/nex/types/ddl-class';
import UInt8 from '@/nex/types/uint8';
import UInt16 from '@/nex/types/uint16';
import PID from '@/nex/types/pid';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreReplayPlayer';

export default class DataStoreReplayPlayer extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private fighter = new UInt8();
	private health = new UInt8();
	private winningRate = new UInt16();
	private color = new UInt8();
	private color2 = new UInt8();
	private principalId = new PID();
	private country = new UInt32();
	private region = new UInt8();
	private number = new UInt8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.fighter.extractFrom(stream);
		this.health.extractFrom(stream);
		this.winningRate.extractFrom(stream);
		this.color.extractFrom(stream);
		this.color2.extractFrom(stream);
		this.principalId.extractFrom(stream);
		this.country.extractFrom(stream);
		this.region.extractFrom(stream);
		this.number.extractFrom(stream);
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

		json.__fields.fighter = this.fighter;
		json.__fields.health = this.health;
		json.__fields.winningRate = this.winningRate;
		json.__fields.color = this.color;
		json.__fields.color2 = this.color2;
		json.__fields.principalId = this.principalId;
		json.__fields.country = this.country;
		json.__fields.region = this.region;
		json.__fields.number = this.number;

		return json;
	}
}
