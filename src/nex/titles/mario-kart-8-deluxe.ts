import Title from '@/nex/titles/title';
import NotificationEventsProtocol from '@/nex/protocols/notification-events';
import MatchMakingExtProtocol from '@/nex/protocols/friends-3ds';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import MatchMakingProtocol from '@/nex/protocols/match-making';
import RankingProtocol from '@/nex/protocols/ranking';
import NATTraversalProtocol from '@/nex/protocols/nat-traversal';
import UtilityProtocol from '@/nex/protocols/utility';

export default class MarioKart8Deluxe extends Title {
	public static displayName = 'Mario Kart 8 Deluxe';
	public static gameServerID = '2b309e01';
	public static accessKey = '09c1c475';
	public static libraryVersions = {
		main: '4.3.2',
		ranking: '4.3.2',
		datastore: '4.3.2',
		match_making: '4.3.2',
		messaging: '4.3.2',
		utility: '4.3.2'
	};

	public static settings = {
		pid_size: 8,
		string_length_size: 2,
		use_structure_header: true,
		session_key_size: 32,
		kerberos_key_version: 0,
		kerberos_ticket_version: 0,
		checksum_size: 4,
		flags_and_type_size: 2
	};

	public static titleIDs = [
		'0100152000022000'
	];

	public static protocols = [
		NotificationEventsProtocol,
		MatchMakingExtProtocol,
		MatchmakeExtensionProtocol,
		MatchMakingProtocol,
		RankingProtocol,
		NATTraversalProtocol,
		UtilityProtocol
		// DataStoreProtocol,
	];
}
