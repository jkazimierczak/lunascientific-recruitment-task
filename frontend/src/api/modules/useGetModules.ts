import useSWR from "swr";
import { type ModuleInfo } from "@/api/types";
import { type FetchError, fetcher } from "@/lib/fetcher";

export function useGetModules() {
	return useSWR<ModuleInfo[], FetchError>("/modules", fetcher);
}
