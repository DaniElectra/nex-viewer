import MatchMakingProtocol from '@/nex/protocols/match-making';
import MatchMakingExtProtocol from '@/nex/protocols/match-making-ext';
import MatchmakeExtensionProtocol from '@/nex/protocols/matchmake-extension';
import NATTraversalProtocol from '@/nex/protocols/nat-traversal';
import NotificationEventsProtocol from '@/nex/protocols/notification-events';
import Title from '@/nex/titles/title';

export default class TetrisAxis extends Title {
	public static displayName = 'Tetris: Axis';
	public static gameServerID = '';
	public static accessKey = '2ef57176';
	public static libraryVersions = {
		main: '2.0.0',
		ranking: '2.0.0',
		datastore: '2.0.0',
		match_making: '2.0.0',
		messaging: '2.0.0',
		utility: '2.0.0'
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
		'000400000004C100',
		'0004000000043800',
		'0004000000039E00'
	];

	public static protocols = [
		MatchMakingProtocol,
		MatchMakingExtProtocol,
		MatchmakeExtensionProtocol,
		NATTraversalProtocol,
		NotificationEventsProtocol
	];
}
