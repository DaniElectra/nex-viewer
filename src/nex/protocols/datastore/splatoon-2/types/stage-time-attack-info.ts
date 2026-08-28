import DDLClass from '@/nex/types/ddl-class';
import RVMap from '@/nex/types/map';
import Int32 from '@/nex/types/int32';
import StageTimeAttackWeapon from '@/nex/protocols/datastore/splatoon-2/types/stage-time-attack-weapon';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'StageTimeAttackInfo';

export default class StageTimeAttackInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private clearWeapons = new RVMap(new Int32(), new StageTimeAttackWeapon());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.clearWeapons.extractFrom(stream);
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

		json.__fields.clearWeapons = this.clearWeapons;

		return json;
	}
}
