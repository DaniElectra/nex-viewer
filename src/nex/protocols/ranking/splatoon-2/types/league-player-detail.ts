import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import Int32 from '@/nex/types/int32';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'LeaguePlayerDetail';

export default class LeaguePlayerDetail extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private principalId = new PID();
	private weaponId = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.principalId.extractFrom(stream);
		this.weaponId.extractFrom(stream);
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

		json.__fields.principalId = this.principalId;
		json.__fields.weaponId = this.weaponId;

		return json;
	}
}
