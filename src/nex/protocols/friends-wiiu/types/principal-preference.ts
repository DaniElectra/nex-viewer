import Data from '@/nex/types/data';
import Bool from '@/nex/types/bool';
import type NEXByteStream from '@/nex/byte-stream';

export default class PrincipalPreference extends Data {
	public get typeName(): string {
		return 'PrincipalPreference';
	}

	private showOnlinePresence = new Bool();
	private showCurrentlyPlayingTitle = new Bool();
	private blockFriendRequests = new Bool();

	public extractFrom(stream: NEXByteStream): void {
		this.extractHeaderFrom(stream);

		this.showOnlinePresence.extractFrom(stream);
		this.showCurrentlyPlayingTitle.extractFrom(stream);
		this.blockFriendRequests.extractFrom(stream);
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
				showOnlinePresence: this.showOnlinePresence,
				showCurrentlyPlayingTitle: this.showCurrentlyPlayingTitle,
				blockFriendRequests: this.blockFriendRequests
			}
		};
	}
}