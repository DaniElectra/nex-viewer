import DDLClass from '@/nex/types/ddl-class';
import UInt32 from '@/nex/types/uint32';
import Float from '@/nex/types/float';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSLevel';

export default class OLSLevel extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private level_id = new UInt32();
	private lums_count = new UInt32();
	private teensies_mask = new UInt32();
	private best_time = new Float();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.level_id.extractFrom(stream);
		this.lums_count.extractFrom(stream);
		this.teensies_mask.extractFrom(stream);
		this.best_time.extractFrom(stream);
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

		json.__fields.level_id = this.level_id;
		json.__fields.lums_count = this.lums_count;
		json.__fields.teensies_mask = this.teensies_mask;
		json.__fields.best_time = this.best_time;

		return json;
	}
}
