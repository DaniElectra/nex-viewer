import DDLClass from '@/nex/types/ddl-class';
import PID from '@/nex/types/pid';
import RVString from '@/nex/types/string';
import UInt8 from '@/nex/types/uint8';
import Int32 from '@/nex/types/int32';
import List from '@/nex/types/list';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'CalicoPlayerSimple';

export default class CalicoPlayerSimple extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private principalId = new PID();
	private name = new RVString();
	private playerType = new UInt8();
	private udemae = new Int32();
	private playerRank = new Int32();
	private starRank = new Int32();
	private fesGrade = new Int32();
	private weaponId = new Int32();
	private headId = new Int32();
	private headSkillIds = new List(new Int32());
	private clothesId = new Int32();
	private clothesSkillIds = new List(new Int32());
	private shoesId = new Int32();
	private shoesSkillIds = new List(new Int32());

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.principalId.extractFrom(stream);
		this.name.extractFrom(stream);
		this.playerType.extractFrom(stream);
		this.udemae.extractFrom(stream);
		this.playerRank.extractFrom(stream);
		this.starRank.extractFrom(stream);
		this.fesGrade.extractFrom(stream);
		this.weaponId.extractFrom(stream);
		this.headId.extractFrom(stream);
		this.headSkillIds.extractFrom(stream);
		this.clothesId.extractFrom(stream);
		this.clothesSkillIds.extractFrom(stream);
		this.shoesId.extractFrom(stream);
		this.shoesSkillIds.extractFrom(stream);
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
		json.__fields.name = this.name;
		json.__fields.playerType = this.playerType;
		json.__fields.udemae = this.udemae;
		json.__fields.playerRank = this.playerRank;
		json.__fields.starRank = this.starRank;
		json.__fields.fesGrade = this.fesGrade;
		json.__fields.weaponId = this.weaponId;
		json.__fields.headId = this.headId;
		json.__fields.headSkillIds = this.headSkillIds;
		json.__fields.clothesId = this.clothesId;
		json.__fields.clothesSkillIds = this.clothesSkillIds;
		json.__fields.shoesId = this.shoesId;
		json.__fields.shoesSkillIds = this.shoesSkillIds;

		return json;
	}
}
