import { Link } from "react-router-dom";
import { Heading } from "@/components/Heading";
import { useGetModules } from "@/api/modules/useGetModules";
import { Module } from "@/components/Module";
import { useSocketData } from "@/hooks/useSocketData";
import { Statusbar } from "@/components/Statusbar";

export function HomePage() {
	const { data: modules } = useGetModules();
	const hasAnyModules = !!modules?.length;

	const { isConnected, getModuleReadingById } = useSocketData();

	const getModuleTemperatureById = (id: string) => (isConnected ? getModuleReadingById(id) : null);

	return (
		<>
			<Statusbar isSocketConnected={isConnected} className="mb-4" />

			<main>
				<Heading className="mb-4">Your Modules</Heading>

				{hasAnyModules && (
					<div className="space-y-2">
						{modules.map((module) => (
							<Link to={`/module/${module.id}`} key={module.id} className="block">
								<Module module={module} temperature={getModuleTemperatureById(module.id)} />
							</Link>
						))}
					</div>
				)}
			</main>
		</>
	);
}
