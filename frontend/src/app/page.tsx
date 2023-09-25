import Link from "next/link";
import { getModules } from "@/api/modules";
import { Module } from "@/components";

export default async function Home() {
	const modules = await getModules();
	const hasAnyModules = modules.length > 0;

	return (
		<main>
			<h1 className="mb-4 text-2xl font-bold tracking-tight">Your Modules</h1>

			{hasAnyModules && (
				<div className="space-y-2">
					{modules.map((module) => (
						<Link href={`/module/${module.id}`} key={module.id} className="block">
							<Module module={module} />
						</Link>
					))}
				</div>
			)}
		</main>
	);
}
