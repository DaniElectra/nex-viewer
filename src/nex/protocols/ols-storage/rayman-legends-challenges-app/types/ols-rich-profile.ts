import DDLClass from '@/nex/types/ddl-class';
import Int32 from '@/nex/types/int32';
import RVString from '@/nex/types/string';
import Int16 from '@/nex/types/int16';
import UInt32 from '@/nex/types/uint32';
import UInt16 from '@/nex/types/uint16';
import Bool from '@/nex/types/bool';
import Float from '@/nex/types/float';
import Int8 from '@/nex/types/int8';
import type NEXByteStream from '@/nex/byte-stream';

const className = 'OLSRichProfile';

export default class OLSRichProfile extends DDLClass {
	public get typeName(): string {
		return className;
	}

	private PID = new Int32();
	private Name = new RVString();
	private PlatformID = new RVString();
	private Country = new Int16();
	private StatusIcon = new UInt32();
	private lastCostume = new UInt32();
	private totalChallengePlayed = new UInt16();
	private dailyPlayed = new Bool();
	private weeklyPlayed = new Bool();
	private dailyExpertPlayed = new Bool();
	private weeklyExpertPlayed = new Bool();
	private DiamondMedals = new UInt16();
	private GoldMedals = new UInt16();
	private SilverMedals = new UInt16();
	private BronzeMedals = new UInt16();
	private GlobalMedalsRank = new UInt32();
	private GlobalMedalsMaxRank = new UInt32();
	private distanceRun = new Float();
	private rank_distanceRun = new UInt32();
	private lums = new Float();
	private rank_lums = new UInt32();
	private pets = new Float();
	private rank_pets = new UInt32();
	private teensies = new Float();
	private rank_teensies = new UInt32();
	private jumps = new Float();
	private rank_jumps = new UInt32();
	private costumes = new Float();
	private rank_costumes = new UInt32();
	private stat_daily = new Float();
	private rank_daily = new UInt32();
	private unit_daily = new Int8();
	private stat_weekly = new Float();
	private rank_weekly = new UInt32();
	private unit_weekly = new Int8();
	private stat_daily_expert = new Float();
	private rank_daily_expert = new UInt32();
	private unit_daily_expert = new Int8();
	private stat_weekly_expert = new Float();
	private rank_weekly_expert = new UInt32();
	private unit_weekly_expert = new Int8();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.PID.extractFrom(stream);
		this.Name.extractFrom(stream);
		this.PlatformID.extractFrom(stream);
		this.Country.extractFrom(stream);
		this.StatusIcon.extractFrom(stream);
		this.lastCostume.extractFrom(stream);
		this.totalChallengePlayed.extractFrom(stream);
		this.dailyPlayed.extractFrom(stream);
		this.weeklyPlayed.extractFrom(stream);
		this.dailyExpertPlayed.extractFrom(stream);
		this.weeklyExpertPlayed.extractFrom(stream);
		this.DiamondMedals.extractFrom(stream);
		this.GoldMedals.extractFrom(stream);
		this.SilverMedals.extractFrom(stream);
		this.BronzeMedals.extractFrom(stream);
		this.GlobalMedalsRank.extractFrom(stream);
		this.GlobalMedalsMaxRank.extractFrom(stream);
		this.distanceRun.extractFrom(stream);
		this.rank_distanceRun.extractFrom(stream);
		this.lums.extractFrom(stream);
		this.rank_lums.extractFrom(stream);
		this.pets.extractFrom(stream);
		this.rank_pets.extractFrom(stream);
		this.teensies.extractFrom(stream);
		this.rank_teensies.extractFrom(stream);
		this.jumps.extractFrom(stream);
		this.rank_jumps.extractFrom(stream);
		this.costumes.extractFrom(stream);
		this.rank_costumes.extractFrom(stream);
		this.stat_daily.extractFrom(stream);
		this.rank_daily.extractFrom(stream);
		this.unit_daily.extractFrom(stream);
		this.stat_weekly.extractFrom(stream);
		this.rank_weekly.extractFrom(stream);
		this.unit_weekly.extractFrom(stream);
		this.stat_daily_expert.extractFrom(stream);
		this.rank_daily_expert.extractFrom(stream);
		this.unit_daily_expert.extractFrom(stream);
		this.stat_weekly_expert.extractFrom(stream);
		this.rank_weekly_expert.extractFrom(stream);
		this.unit_weekly_expert.extractFrom(stream);
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

		json.__fields.PID = this.PID;
		json.__fields.Name = this.Name;
		json.__fields.PlatformID = this.PlatformID;
		json.__fields.Country = this.Country;
		json.__fields.StatusIcon = this.StatusIcon;
		json.__fields.lastCostume = this.lastCostume;
		json.__fields.totalChallengePlayed = this.totalChallengePlayed;
		json.__fields.dailyPlayed = this.dailyPlayed;
		json.__fields.weeklyPlayed = this.weeklyPlayed;
		json.__fields.dailyExpertPlayed = this.dailyExpertPlayed;
		json.__fields.weeklyExpertPlayed = this.weeklyExpertPlayed;
		json.__fields.DiamondMedals = this.DiamondMedals;
		json.__fields.GoldMedals = this.GoldMedals;
		json.__fields.SilverMedals = this.SilverMedals;
		json.__fields.BronzeMedals = this.BronzeMedals;
		json.__fields.GlobalMedalsRank = this.GlobalMedalsRank;
		json.__fields.GlobalMedalsMaxRank = this.GlobalMedalsMaxRank;
		json.__fields.distanceRun = this.distanceRun;
		json.__fields.rank_distanceRun = this.rank_distanceRun;
		json.__fields.lums = this.lums;
		json.__fields.rank_lums = this.rank_lums;
		json.__fields.pets = this.pets;
		json.__fields.rank_pets = this.rank_pets;
		json.__fields.teensies = this.teensies;
		json.__fields.rank_teensies = this.rank_teensies;
		json.__fields.jumps = this.jumps;
		json.__fields.rank_jumps = this.rank_jumps;
		json.__fields.costumes = this.costumes;
		json.__fields.rank_costumes = this.rank_costumes;
		json.__fields.stat_daily = this.stat_daily;
		json.__fields.rank_daily = this.rank_daily;
		json.__fields.unit_daily = this.unit_daily;
		json.__fields.stat_weekly = this.stat_weekly;
		json.__fields.rank_weekly = this.rank_weekly;
		json.__fields.unit_weekly = this.unit_weekly;
		json.__fields.stat_daily_expert = this.stat_daily_expert;
		json.__fields.rank_daily_expert = this.rank_daily_expert;
		json.__fields.unit_daily_expert = this.unit_daily_expert;
		json.__fields.stat_weekly_expert = this.stat_weekly_expert;
		json.__fields.rank_weekly_expert = this.rank_weekly_expert;
		json.__fields.unit_weekly_expert = this.unit_weekly_expert;

		return json;
	}
}
