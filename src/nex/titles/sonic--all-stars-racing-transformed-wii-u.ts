import MatchMakingProtocol from '@/nex/protocols/match-making';
import MatchMakingExtProtocol from '@/nex/protocols/match-making-ext';
import MatchmakeExtensionrotocol from '@/nex/protocols/matchmake-extension';
import NATTraversalProtocol from '@/nex/protocols/nat-traversal';
import NotificationEventsProtocol from '@/nex/protocols/notification-events';
import RankingProtocol from '@/nex/protocols/ranking';
import Title from '@/nex/titles/title';

export default class SonicAllStarsRacingTransformedWiiU extends Title {
	public static displayName = 'Sonic & All-Stars Racing Transformed (Wii U)';
	public static gameServerID = '';
	public static accessKey = 'b26a3421';
	public static libraryVersions = {
		main: '3.0.1',
		ranking: '3.0.1',
		datastore: '3.0.1',
		match_making: '3.0.1',
		messaging: '3.0.1',
		utility: '3.0.1'
	};

	public static settings = {
		pid_size: 4,
		string_length_size: 2,
		use_structure_header: false,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2
	};

	public static titleIDs = [
		'000500001010B300',
		'0005000010111F00',
		'000500001015B400'
	];

	public static protocols = [
		MatchMakingProtocol,
		MatchMakingExtProtocol,
		MatchmakeExtensionrotocol,
		NATTraversalProtocol,
		NotificationEventsProtocol,
		RankingProtocol
	];
}
