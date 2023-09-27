import useSWR from "swr";
import { type ModuleInfo } from "@/api/types";
import { type ApiError, fetcher } from "@/lib/fetcher";

export function useGetModules() {
	return useSWR<ModuleInfo[], ApiError>("/modules", fetcher);
}