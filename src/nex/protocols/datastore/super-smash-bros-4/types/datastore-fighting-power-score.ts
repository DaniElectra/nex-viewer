import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DataStoreFightingPowerScore';

export default class DataStoreFightingPowerScore extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private score = new UInt32();
	private rank = new UInt32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.score.extractFrom(stream);
		this.rank.extractFrom(stream);
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

		json.__fields.score = this.score;
		json.__fields.rank = this.rank;

		return json;
	}
}
