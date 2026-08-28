import DDLClass from '@/nex/types/ddl-class';
import Int32 from '@/nex/types/int32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'StageTimeAttackWeapon';

export default class StageTimeAttackWeapon extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private weaponLevel = new Int32();
	private clearTime = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.weaponLevel.extractFrom(stream);
		this.clearTime.extractFrom(stream);
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

		json.__fields.weaponLevel = this.weaponLevel;
		json.__fields.clearTime = this.clearTime;

		return json;
	}
}
