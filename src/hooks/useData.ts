import { AxiosRequestConfig, CanceledError } from "axios";
import { useState, useEffect } from "react";
import create from "../services/rawg-http";

export interface FetchResponse<T> {
	count: number;
	results: T[];
	next: string;
}

export const useData = <T>(
	endpoint: string,
	requestConfig?: AxiosRequestConfig,
	deps?: any[],
	pageRequest?: boolean
) => {
	const [gameData, setGameData] = useState<T[]>([]);
	const [error, setError] = useState("");
	const [nextPage, setNextPage] = useState("");
	const [isLoading, setLoading] = useState(false);

	useEffect(
		() => {
			setLoading(true);
			const { request, cancel } = create(endpoint, requestConfig).getAll<
				FetchResponse<T>
			>();
			request
				.then(({ data }) => {
					{
						setLoading(false);

						setGameData(
							pageRequest ? [...gameData, ...data.results] : data.results
						);
						setNextPage(data.next);
					}
				})
				.catch((err) => {
					if (err instanceof CanceledError) return;
					setLoading(false);
					setError(err.message);
				});

			return () => cancel();
		},
		deps ? [...deps] : []
	);
	return { error, isLoading, nextPage, gameData };
};
