import MatchMakingProtocol from '@/nex/protocols/match-making';
import MatchMakingExtProtocol from '@/nex/protocols/match-making-ext';
import MatchmakeExtensionrotocol from '@/nex/protocols/matchmake-extension';
import NATTraversalProtocol from '@/nex/protocols/nat-traversal';
import NotificationEventsProtocol from '@/nex/protocols/notification-events';
import Title from '@/nex/titles/title';

export default class SonicAllStarsRacingTransformed3DS extends Title {
	public static displayName = 'Sonic & All-Stars Racing Transformed (3DS)';
	public static gameServerID = '';
	public static accessKey = '53e42e5b';
	public static libraryVersions = {
		main: '2.7.3',
		ranking: '2.7.3',
		datastore: '2.7.3',
		match_making: '2.7.3',
		messaging: '2.7.3',
		utility: '2.7.3'
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
		'000400000008FC00',
		'00040000000B3500'
	];

	public static protocols = [
		MatchMakingProtocol,
		MatchMakingExtProtocol,
		MatchmakeExtensionrotocol,
		NATTraversalProtocol,
		NotificationEventsProtocol
	];
}
