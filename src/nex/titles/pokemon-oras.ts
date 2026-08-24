import Title from '@/nex/titles/title';
import Datastore from '@/nex/protocols/datastore';
import MatchmakeExtension from '@/nex/protocols/matchmake-extension';
import Matchmaking from '@/nex/protocols/match-making';
import MatchMakingExt from '@/nex/protocols/match-making-ext';
import MessageDelivery from '@/nex/protocols/message-delivery';
import NATTraversal from '@/nex/protocols/nat-traversal';
import Subscription from '@/nex/protocols/subscription';
import Utility from '@/nex/protocols/utility';

export default class PokemonORAS extends Title {
	public static displayName = 'Pokémon Omega Ruby/Alpha Sapphire';
	public static gameServerID = '';
	public static accessKey = '876138df';
	public static libraryVersions = {
		main: '3.3.8',
		ranking: '3.3.8',
		datastore: '3.3.8',
		match_making: '3.3.8',
		messaging: '3.3.8',
		utility: '3.3.8'
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
		'000400000011C500',
		'000400000011C400'
	];

	public static protocols = [
		Datastore,
		MatchmakeExtension,
		Matchmaking,
		MatchMakingExt,
		MessageDelivery,
		NATTraversal,
		Subscription,
		Utility
	]; // * Populate with the protocols this title uses
}
