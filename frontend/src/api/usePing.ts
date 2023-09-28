import useSWR from "swr";
import { type ApiError, fetcher } from "@/lib/fetcher";

export function usePing() {
	const { data, error } = useSWR<string, ApiError>("/ping", fetcher, {
		refreshInterval: 1000,
		errorRetryInterval: 1000,
	});

	if (error) return false;
	return data === "pong!";
}
