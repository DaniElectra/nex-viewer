import Title from '@/nex/titles/title';
import DataStoreProtocolSuperSmashBrosUltimate from '@/nex/protocols/datastore/super-smash-bros-ultimate';
import MatchmakeExtensionProtocolSuperSmashBrosUltimate from '@/nex/protocols/matchmake-extension/super-smash-bros-ultimate';
import TournamentProtocol from '@/nex/protocols/tournament';
import UtilityProtocolSuperSmashBrosUltimate from '@/nex/protocols/utility/super-smash-bros-ultimate';

export default class SuperSmashBrosUltimate extends Title {
	public static displayName = 'Super Smash Bros. Ultimate';
	public static gameServerID = '23380901';
	public static accessKey = '9587602b';
	public static libraryVersions = {
		main: '4.6.2',
		ranking: '4.6.2',
		datastore: '4.6.2',
		match_making: '4.6.2',
		messaging: '4.6.2',
		utility: '4.6.2'
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
		'01006A800016E000'
	];

	public static protocols = [
		DataStoreProtocolSuperSmashBrosUltimate,
		MatchmakeExtensionProtocolSuperSmashBrosUltimate,
		TournamentProtocol,
		UtilityProtocolSuperSmashBrosUltimate
	]; // * Populate with the protocols this title uses
}
