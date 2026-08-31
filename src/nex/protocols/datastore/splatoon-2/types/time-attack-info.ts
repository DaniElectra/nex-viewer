import DDLClass from '@/nex/types/ddl-class';
import RVMap from '@/nex/types/map';
import Int32 from '@/nex/types/int32';
import StageTimeAttackInfo from '@/nex/protocols/datastore/splatoon-2/types/stage-time-attack-info';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'TimeAttackInfo';

export default class TimeAttackInfo extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private stageInfos = new RVMap(new Int32(), new StageTimeAttackInfo());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.stageInfos.extractFrom(stream);
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

		json.__fields.stageInfos = this.stageInfos;

		return json;
	}
}
