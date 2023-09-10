import { AxiosRequestConfig } from "axios";
import rawgApi from "./rawg-api";

class RawgHtml {
	endpoint: string;
	requestConfig?: AxiosRequestConfig;

	constructor(endpoint: string, requestConfig?: AxiosRequestConfig) {
		this.endpoint = endpoint;
		this.requestConfig = requestConfig;
	}

	getAll<T>() {
		const controller = new AbortController();

		const request = rawgApi.get<T>(this.endpoint, {
			signal: controller.signal,
			...this.requestConfig,
		});

		return { request, cancel: () => controller.abort() };
	}
}

const create = (endpoint: string, requestConfig?: AxiosRequestConfig) =>
	new RawgHtml(endpoint, requestConfig);

export default create;
