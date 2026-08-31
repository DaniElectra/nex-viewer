import DDLClass from '@/nex/types/ddl-class';
import UInt64 from '@/nex/types/uint64';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'DeathPositionInfo';

export default class DeathPositionInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private dataID = new UInt64();
	private x = new UInt32();
	private y = new UInt32();
	private isSubworld = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.dataID.extractFrom(stream);
		this.x.extractFrom(stream);
		this.y.extractFrom(stream);
		this.isSubworld.extractFrom(stream);
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

		json.__fields.dataID = this.dataID;
		json.__fields.x = this.x;
		json.__fields.y = this.y;
		json.__fields.isSubworld = this.isSubworld;

		return json;
	}
}
