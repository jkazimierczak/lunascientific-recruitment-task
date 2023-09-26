import useSWR from "swr";
import { type ModuleInfo } from "@/api/responseTypes";
import { fetcher } from "@/lib/fetcher";

export function useGetModules() {
	return useSWR<ModuleInfo[], Error>("/modules", fetcher);
}
