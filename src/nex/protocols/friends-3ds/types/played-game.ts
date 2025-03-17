import Data from '@/nex/types/data';
import GameKey from '@/nex/protocols/friends-3ds/types/game-key';
import DateTime from '@/nex/types/datetime';
import type NEXByteStream from '@/nex/byte-stream';

export default class PlayedGame extends Data {
	public get typeName(): string {
		return 'PlayedGame';
	}

	private gamekey = new GameKey();
	private unknown = new DateTime();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.gamekey.extractFrom(stream);
		this.unknown.extractFrom(stream);
	}

	public new(): this {
		return new (this.constructor as new () => this)();
	}

	public toJSON(): any {
		return {
			__version: this.structureVersion,
			__displayTypeName: this.typeName,
			__typeName: this.typeName,
			__fields: {
				gamekey: this.gamekey,
				unknown: this.unknown
			}
		};
	}
}