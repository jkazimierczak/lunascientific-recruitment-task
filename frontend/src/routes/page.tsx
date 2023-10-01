import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { Heading } from "@/components/Heading";
import { useGetModules } from "@/api/modules/useGetModules";
import { Module } from "@/components/Module";
import { useSocketData, type UseSocketDataReturn } from "@/api/modules/useSocketData";
import { StatusChip } from "@/components/Chips/StatusChip";
import { NetworkError } from "@/lib/fetcher";
import { type ModuleInfo } from "@/api/types";
import { usePing } from "@/api/usePing";
import { Skeleton } from "@/components/UI/Skeleton";
import { Button } from "@/components/UI/Button";
import { Input } from "@/components/UI/Input";

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
	const [search, setSearch] = useState("");

	// Try to refetch data if socket connects first
	useEffect(() => {
		if (isServerConnected || (isSocketConnected && !isServerConnected)) {
			mutate(undefined).catch(() => null);
		}
	}, [isServerConnected]);

	const filteredModules: ModuleInfo[] | undefined = search
		? modules?.filter((module) => module.name.toLowerCase().includes(search))
		: modules;
	const hasAnyModules = !!filteredModules?.length;

	function handleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
		setSearch(e.target.value);
	}

	return (
		<>
			<StatusChip
				isSocketConnected={isSocketConnected}
				isServerConnected={isServerConnected}
				className="mb-4"
			/>

			<main>
				<div className="mb-4 flex items-center justify-between">
					<Heading>Your Modules</Heading>
					{isServerConnected && (
						<Button variant="outline" asChild>
							<Link to="/module/add">
								<Plus className="mr-2" size={16} /> Add
							</Link>
						</Button>
					)}
				</div>
				{!error && (
					<>
						{hasAnyModules && (
							<>
								<Input
									placeholder="Search for module"
									onChange={handleSearchChange}
									className="mb-4"
								/>
								<ModuleList modules={filteredModules} getModuleReadingById={getModuleReadingById} />
							</>
						)}
						{isLoading && <ModuleListSkeleton />}
					</>
				)}
				{error && error instanceof NetworkError && <div>{error.message}</div>}
			</main>
		</>
	);
}
