import { customFetch } from "@/lib/fetcher";
import { type ModuleEditSchema } from "@/validators/moduleSchema";
import { baseApiUrl } from "@/lib/constants";

export function updateModule(id: string, moduleData: ModuleEditSchema) {
	const url = new URL(`/modules/${id}`, baseApiUrl);
	return customFetch(url, {
		method: "PATCH",
		body: JSON.stringify(moduleData),
	}).then((res) => res.json());
}
