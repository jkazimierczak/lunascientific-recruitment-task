import { baseApiUrl } from "./constants";
import { ApplicationError } from "@/lib/error";

export class ApiError extends ApplicationError {
	response: Response;

	constructor(message: string, res: Response, options?: ErrorOptions) {
		super(message, options);
		this.response = res;
	}
}

export async function customFetch(input: RequestInfo | URL, init?: RequestInit) {
	let initOptions = init;

	if (init?.body) {
		initOptions = {
			...initOptions,
			headers: {
				"Content-Type": "application/json",
				...initOptions?.headers,
			},
		};
	}

	const res = await fetch(input, initOptions);
	if (!res.ok) {
		throw new ApiError("Bad response", res);
	}
	return res;
}

export const fetcher = (url: string | URL) =>
	customFetch(new URL(url, baseApiUrl)).then((res) => res.json());
