import { number } from "zod";
import { useData } from "./useData";
import { Platform } from "./usePlatform";
import { Genre } from "./useGenre";

export interface Game {
	id: number;
	name: string;
	slug: string;
	rating: number;
	parent_platforms: { platform: Platform }[];
	background_image: string;
	rating_top: number;
	metacritic: number;
	added: number;
	short_screenshots: { image: string }[];
	released: string;
	genres: Genre[];
}

export interface GameQuery {
	// genre: number[] | null;
	genre: string;
	platform: number | null;
	sort: string;
	search: string;
	page: number | null;
}

const useGames = (gameQuery: GameQuery, pageRequest?: boolean) =>
	useData<Game>(
		"/games",
		{
			params: {
				genres: gameQuery.genre,
				parent_platforms: gameQuery.platform,
				ordering: gameQuery.sort,
				search: gameQuery.search,
				page: gameQuery.page,
			},
		},
		[gameQuery],
		pageRequest
	);
export default useGames;
