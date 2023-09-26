import { baseApiUrl } from "@/api/endpoints";
import { ApplicationError } from "@/error";

export class ApiError extends ApplicationError {
	response: Response;

	constructor(message: string, res: Response, options?: ErrorOptions) {
		super(message, options);
		this.response = res;
	}
}

export const isPlainObject = (value: unknown) => value?.constructor === Object;

export async function customFetch(input: RequestInfo | URL, init?: RequestInit) {
	let initOptions = init;

	if (init?.body) {
		if (Array.isArray(init.body) || isPlainObject(init.body)) {
			initOptions = {
				...initOptions,
				body: JSON.stringify(initOptions?.body),
				headers: {
					"Content-Type": "application/json",
					...initOptions?.headers,
				},
			};
		}
	}

	const res = await fetch(input, initOptions);
	if (!res.ok) {
		throw new ApiError("Bad response", res);
	}
	return res;
}

export const fetcher = (url: string | URL) =>
	customFetch(new URL(url, baseApiUrl)).then((res) => res.json());
