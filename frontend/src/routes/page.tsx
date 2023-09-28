import { Link } from "react-router-dom";
import { useEffect } from "react";
import { Heading } from "@/components/Heading";
import { useGetModules } from "@/api/modules/useGetModules";
import { Module } from "@/components/Module";
import { useSocketData } from "@/api/modules/useSocketData";
import { StatusChip } from "@/components/Chip/StatusChip";
import { ModuleSkeleton } from "@/components/ModuleSkeleton";
import { NetworkError } from "@/lib/fetcher";
import { type ModuleInfo } from "@/api/types";
import { usePing } from "@/api/usePing";

function ModuleList({
	modules,
	getModuleReadingById,
}: {
	modules: ModuleInfo[];
	getModuleReadingById: (id: string) => number | null;
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
