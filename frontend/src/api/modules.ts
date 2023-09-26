import { apiModulesUrl, apiPongUrl, getApiModuleUrl } from "@/api/endpoints";
import { ApiError } from "@/api/errors";
import { type ModuleInfo, type ModuleInfoPatch } from "@/api/responseTypes";

async function makeRequest(input: RequestInfo | URL, init?: RequestInit | undefined) {
	try {
		const res = await fetch(input, {
			...init,
			cache: "no-store",
		});
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

export async function getModuleById(id: string) {
	try {
		const res = await makeRequest(getApiModuleUrl(id));
		return (await res.json()) as ModuleInfo;
	} catch (e) {
		return null;
	}
}

export async function patchModuleById(id: string, moduleData: ModuleInfoPatch) {
	// try {
	const res = await makeRequest(getApiModuleUrl(id), {
		method: "PATCH",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(moduleData),
	});
	return (await res.json()) as ModuleInfo;
}
