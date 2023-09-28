import { Link } from "react-router-dom";
import { Heading } from "@/components/Heading";
import { useGetModules } from "@/api/modules/useGetModules";
import { Module } from "@/components/Module";
import { useSocketData } from "@/hooks/useSocketData";
import { Statusbar } from "@/components/Statusbar";
import { ModuleSkeleton } from "@/components/ModuleSkeleton";
import { NetworkError } from "@/lib/fetcher";

export function HomePage() {
	const { data: modules, isLoading, error } = useGetModules();
	const hasAnyModules = !!modules?.length;

	const { isConnected, getModuleReadingById } = useSocketData();

	const getModuleTemperatureById = (id: string) => (isConnected ? getModuleReadingById(id) : null);

	return (
		<>
			<Statusbar isSocketConnected={isConnected} className="mb-4" />

			<main>
				<Heading className="mb-4">Your Modules</Heading>

				{!error && (
					<>
						{hasAnyModules && (
							<div className="space-y-2">
								{modules.map((module) => (
									<Link to={`/module/${module.id}`} key={module.id} className="block">
										<Module module={module} temperature={getModuleTemperatureById(module.id)} />
									</Link>
								))}
							</div>
						)}
						{isLoading && (
							<div className="space-y-2">
								{Array.from({ length: 3 }).map((_, i) => (
									<ModuleSkeleton key={`ModuleSkeleton${i}`} />
								))}
							</div>
						)}
					</>
				)}
				{error && error instanceof NetworkError && <div>{error.message}</div>}
			</main>
		</>
	);
}
