import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Int8 from '@/nex/types/int8';
import Int32 from '@/nex/types/int32';
import UInt16 from '@/nex/types/uint16';
import UInt64 from '@/nex/types/uint64';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SaveProfile';

	private update_bitfield = new UInt32();
	private level = new Int8();
	private currency = new Int32();
	private costume = new UInt32();
	private bronze_medals = new UInt16();
	private silver_medals = new UInt16();
	private gold_medals = new UInt16();
	private diamond_medals = new UInt16();
	private run_distance = new UInt32();
	private teensies_freed = new UInt16();
	private jumps = new UInt32();
	private unlocked_pets = new UInt16();
	private pets = new UInt64();
	private unlocked_costumes = new UInt16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.update_bitfield.extractFrom(stream);
		this.level.extractFrom(stream);
		this.currency.extractFrom(stream);
		this.costume.extractFrom(stream);
		this.bronze_medals.extractFrom(stream);
		this.silver_medals.extractFrom(stream);
		this.gold_medals.extractFrom(stream);
		this.diamond_medals.extractFrom(stream);
		this.run_distance.extractFrom(stream);
		this.teensies_freed.extractFrom(stream);
		this.jumps.extractFrom(stream);
		this.unlocked_pets.extractFrom(stream);
		this.pets.extractFrom(stream);
		this.unlocked_costumes.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			update_bitfield: this.update_bitfield,
			level: this.level,
			currency: this.currency,
			costume: this.costume,
			bronze_medals: this.bronze_medals,
			silver_medals: this.silver_medals,
			gold_medals: this.gold_medals,
			diamond_medals: this.diamond_medals,
			run_distance: this.run_distance,
			teensies_freed: this.teensies_freed,
			jumps: this.jumps,
			unlocked_pets: this.unlocked_pets,
			pets: this.pets,
			unlocked_costumes: this.unlocked_costumes
		};
	}
}

export class Response {
	public static Name = 'SaveProfile';

	private competition_medals_0 = new UInt16();
	private competition_medals_1 = new UInt16();
	private competition_medals_2 = new UInt16();
	private competition_medals_3 = new UInt16();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.competition_medals_0.extractFrom(stream);
		this.competition_medals_1.extractFrom(stream);
		this.competition_medals_2.extractFrom(stream);
		this.competition_medals_3.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			competition_medals_0: this.competition_medals_0,
			competition_medals_1: this.competition_medals_1,
			competition_medals_2: this.competition_medals_2,
			competition_medals_3: this.competition_medals_3
		};
	}
}
