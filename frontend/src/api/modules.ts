import { apiModulesUrl, apiPongUrl } from "@/api/endpoints";
import { ApiError } from "@/api/errors";
import { type ModuleInfo } from "@/api/responseTypes";

async function makeRequest(input: RequestInfo | URL, init?: RequestInit | undefined) {
	try {
		const res = await fetch(input, init);
		if (res.ok) {
			return res;
		}
		throw new ApiError(`Fetch status code: ${res.status} ${res.statusText}`);
	} catch (err) {
		throw err;
	}
}

export async function checkIfApiIsUp() {
	try {
		const res = await makeRequest(apiPongUrl);
		const resText = (await res.json()) as string;
		return res.status === 200 && resText === "pong!";
	} catch (e) {
		return false;
	}
}

export async function getModules() {
	try {
		const res = await makeRequest(apiModulesUrl);
		return (await res.json()) as ModuleInfo[];
	} catch (e) {
		return [];
	}
}
