import { customFetch } from "@/lib/fetcher";
import { type ModuleEditSchema } from "@/validators/moduleSchema";
import { baseApiUrl } from "@/lib/constants";

export function addModule(moduleData: ModuleEditSchema) {
	const url = new URL(`/modules`, baseApiUrl);
	return customFetch(url, {
		method: "POST",
		body: JSON.stringify(moduleData),
	});
}
