import NEXByteStream from '@/nex/byte-stream';
import List from '@/nex/types/list';
import QResult from '@/nex/types/qresult';
import GetWorldMapParam from '@/nex/protocols/datastore/super-mario-maker-2/types/get-world-map-param';
import WorldMapInfo from '@/nex/protocols/datastore/super-mario-maker-2/types/world-map-info';
import type RMCMessage from '@/nex/rmc-message';

// TODO - Add strict types for toJSON methods

export class Request {
	public static Name = 'GetWorldMap';

	private param = new GetWorldMapParam();

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
	public static Name = 'GetWorldMap';

	private worldMaps = new List(new WorldMapInfo());
	private results = new List(new QResult());

	constructor(message: RMCMessage) {
		const stream = new NEXByteStream(message.parametersData!, message.connection!.title!);

		this.worldMaps.extractFrom(stream);
		this.results.extractFrom(stream);
	}

	public toJSON(): any {
		return {
			worldMaps: this.worldMaps,
			results: this.results
		};
	}
}
