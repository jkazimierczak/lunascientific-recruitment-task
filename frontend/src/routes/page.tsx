import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Heading } from "@/components/Heading";
import { useGetModules } from "@/api/modules/useGetModules";
import { Module } from "@/components/Module";
import { useSocketData, type UseSocketDataReturn } from "@/api/modules/useSocketData";
import { StatusChip } from "@/components/Chips/StatusChip";
import { NetworkError } from "@/lib/fetcher";
import { type ModuleInfo } from "@/api/types";
import { usePing } from "@/api/usePing";
import { Skeleton } from "@/components/UI/Skeleton";

function ModuleList({
	modules,
	getModuleReadingById,
}: {
	modules: ModuleInfo[];
	getModuleReadingById: UseSocketDataReturn["getModuleReadingById"];
}) {
	return (
		<div className="space-y-2">
			{modules.map((module) => (
				<Link to={`/module/${module.id}`} key={module.id} className="block">
					<Module module={module} temperature={getModuleReadingById(module.id)} />
				</Link>
			))}
		</div>
	);
}

function ModuleSkeleton() {
	return (
		<div className="cursor-progress rounded border border-neutral-300/80 px-4 py-2 transition-all">
			<Skeleton className="mb-2 h-7 w-3/5" />
			<Skeleton className="h-7" />
		</div>
	);
}

function ModuleListSkeleton() {
	return (
		<div className="space-y-2">
			{Array.from({ length: 3 }).map((_, i) => (
				<ModuleSkeleton key={`ModuleSkeleton${i}`} />
			))}
		</div>
	);
}

export function HomePage() {
	const { data: modules, isLoading, error, mutate } = useGetModules();
	const { isConnected: isSocketConnected, getModuleReadingById } = useSocketData();
	const isServerConnected = usePing();

	useEffect(() => {
		if (isServerConnected || (isSocketConnected && !isServerConnected)) {
			mutate(undefined).catch(() => null);
		}
	}, [isServerConnected]);

	const hasAnyModules = !!modules?.length;

	return (
		<>
			<StatusChip
				isSocketConnected={isSocketConnected}
				isServerConnected={isServerConnected}
				className="mb-4"
			/>

			<main>
				<Heading className="mb-4">Your Modules</Heading>
				{!error && (
					<>
						{hasAnyModules && (
							<ModuleList modules={modules} getModuleReadingById={getModuleReadingById} />
						)}
						{isLoading && <ModuleListSkeleton />}
					</>
				)}
				{error && error instanceof NetworkError && <div>{error.message}</div>}
			</main>
		</>
	);
}
