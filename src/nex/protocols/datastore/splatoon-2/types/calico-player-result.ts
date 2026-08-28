import DDLClass from '@/nex/types/ddl-class';
import Int32 from '@/nex/types/int32';
import CalicoPlayerSimple from '@/nex/protocols/datastore/splatoon-2/types/calico-player-simple';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CalicoPlayerResult';

export default class CalicoPlayerResult extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private playerSimple = new CalicoPlayerSimple();
	private killCount = new Int32();
	private assistCount = new Int32();
	private deathCount = new Int32();
	private specialCount = new Int32();
	private gamePaintPoint = new Int32();
	private sortScore = new Int32();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.playerSimple.extractFrom(stream);
		this.killCount.extractFrom(stream);
		this.assistCount.extractFrom(stream);
		this.deathCount.extractFrom(stream);
		this.specialCount.extractFrom(stream);
		this.gamePaintPoint.extractFrom(stream);
		this.sortScore.extractFrom(stream);
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

		json.__fields.playerSimple = this.playerSimple;
		json.__fields.killCount = this.killCount;
		json.__fields.assistCount = this.assistCount;
		json.__fields.deathCount = this.deathCount;
		json.__fields.specialCount = this.specialCount;
		json.__fields.gamePaintPoint = this.gamePaintPoint;
		json.__fields.sortScore = this.sortScore;

		return json;
	}
}
