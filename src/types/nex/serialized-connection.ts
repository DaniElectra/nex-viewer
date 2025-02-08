import type RMCMessage from '@/nex/rmc-message';
import type NEXByteStreamSettings from '@/types/nex/byte-stream-settings';
import type ServiceProtocol from '@/types/nex/service-protocol';
/*
export type Title = {
	name: string;
	game_server_id: string;
	access_key: string;
	library_versions: {
		main: string;
		ranking: string;
		datastore: string;
		match_making: string;
		messaging: string;
		utility: string;
	};
	settings: NEXByteStreamSettings;
	title_ids: string[];
};
*/
export interface Title {
	name: string;
	gameServerID: string;
	accessKey: string;
	libraryVersions: {
		main: string;
		ranking: string;
		datastore: string;
		match_making: string;
		messaging: string;
		utility: string;
	};
	settings: NEXByteStreamSettings;
	titleIDs: string[];
	protocols: ServiceProtocol[];

	getProtocolHandler(message: RMCMessage): ServiceProtocol | undefined;
}

export type SerializedConnection = {
	title: Title
};

export default SerializedConnection;