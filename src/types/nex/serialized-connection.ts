import type NEXByteStreamSettings from '@/types/nex/byte-stream-settings';

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

export type SerializedConnection = {
	title: Title
};

export default SerializedConnection;