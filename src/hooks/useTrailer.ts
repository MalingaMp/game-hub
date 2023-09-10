import { useData } from "./useData";

interface Data {
	480: string;
	max: string;
}

export interface Trailer {
	id: number;
	name: string;
	data: Data;
}

const useTrailer = (id: number) => useData<Trailer>(`/games/${id}/movies`);

export default useTrailer;
