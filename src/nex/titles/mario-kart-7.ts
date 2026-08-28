import MatchMakingProtocol from '@/nex/protocols/match-making';
import MatchMakingExtProtocol from '@/nex/protocols/match-making-ext';
import MatchmakeExtensionrotocol from '@/nex/protocols/matchmake-extension';
import NATTraversalProtocol from '@/nex/protocols/nat-traversal';
import NotificationEventsProtocol from '@/nex/protocols/notification-events';
import RankingProtocolMarioKart7 from '@/nex/protocols/ranking/mario-kart-7';
import Title from '@/nex/titles/title';

export default class MARIOKART7 extends Title {
	public static displayName = 'MARIO KART 7';
	public static gameServerID = '';
	public static accessKey = '6181dff1';
	public static libraryVersions = {
		main: '2.4.3',
		ranking: '2.4.3',
		datastore: '2.4.3',
		match_making: '2.4.3',
		messaging: '2.4.3',
		utility: '2.4.3'
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
		'0004000000030600',
		'0004000000030700',
		'0004000000030800',
		'0004000000030A00',
		'000400000008B400'
	];

	public static protocols = [
		MatchMakingProtocol,
		MatchMakingExtProtocol,
		MatchmakeExtensionrotocol,
		NATTraversalProtocol,
		NotificationEventsProtocol,
		RankingProtocolMarioKart7
	]; // TODO - Legacy Ranking and Storage Manager protocols
}
