import AnyDataHolder from '@/nex/types/any-data-holder';
import List from '@/nex/types/list';
import type RVString from '@/nex/types/string';
import MatchmakeSessionSearchCriteria from '@/nex/protocols/match-making/types/matchmake-session-search-criteria';

export type Request = {
	criteria: List<MatchmakeSessionSearchCriteria>;
	gathering: AnyDataHolder;
	message: RVString;
};

export type Response = {
	joinedMatchmakeSession: AnyDataHolder;
};
