import NEXByteStream from '@/nex/byte-stream';
import UInt32 from '@/nex/types/uint32';
import Bool from '@/nex/types/bool';
import Float from '@/nex/types/float';
import RVString from '@/nex/types/string';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SaveScore';

	private id_leaderboard = new UInt32();
	private is_objective_reached = new Bool();
	private score = new Float();
	private tomb_x = new Float();
	private tomb_y = new Float();
	private tomb_z = new Float();
	private id_costume = new UInt32();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.id_leaderboard.extractFrom(stream);
		this.is_objective_reached.extractFrom(stream);
		this.score.extractFrom(stream);
		this.tomb_x.extractFrom(stream);
		this.tomb_y.extractFrom(stream);
		this.tomb_z.extractFrom(stream);
		this.id_costume.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			id_leaderboard: this.id_leaderboard,
			is_objective_reached: this.is_objective_reached,
			score: this.score,
			tomb_x: this.tomb_x,
			tomb_y: this.tomb_y,
			tomb_z: this.tomb_z,
			id_costume: this.id_costume
		};
	}
}

export class Response {
	public static Name = 'SaveScore';

	private save_score = new Bool();
	private retry = new Bool();
	private medal = new UInt32();
	private message_medal = new RVString();
	private message_friends = new RVString();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.save_score.extractFrom(stream);
		this.retry.extractFrom(stream);
		this.medal.extractFrom(stream);
		this.message_medal.extractFrom(stream);
		this.message_friends.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			save_score: this.save_score,
			retry: this.retry,
			medal: this.medal,
			message_medal: this.message_medal,
			message_friends: this.message_friends
		};
	}
}
