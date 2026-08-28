import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import SearchWorldMapPlayedByParam from '@/nex/protocols/datastore/super-mario-maker-2/types/search-world-map-played-by-param';
import WorldMapInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/world-map-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'SearchWorldMapPlayedBy';

	private param = new SearchWorldMapPlayedByParam();

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.param.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			param: this.param
		};
	}
}

export class Response {
	public static Name = 'SearchWorldMapPlayedBy';

	private worldMaps = new List(new WorldMapInfo());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.worldMaps.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			worldMaps: this.worldMaps
		};
	}
}
