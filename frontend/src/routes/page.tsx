import { Link } from "react-router-dom";
import { Heading } from "@/components/Heading";
import { useGetModules } from "@/api/modules/useGetModules";
import { Module } from "@/components";

export function HomePage() {
	const { data: modules } = useGetModules();
	const hasAnyModules = !!modules?.length;

	return (
		<main>
			<Heading className="mb-4">Your Modules</Heading>

			{hasAnyModules && (
				<div className="space-y-2">
					{modules.map((module) => (
						<Link to={`/module/${module.id}`} key={module.id} className="block">
							<Module module={module} />
						</Link>
					))}
				</div>
			)}
		</main>
	);
}
