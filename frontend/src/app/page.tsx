import Link from "next/link";
import { getModules } from "@/api/modules";
import { Module } from "@/components";
import { Heading } from "@/components/Heading";

export default async function Home() {
	const modules = await getModules();
	const hasAnyModules = modules.length > 0;

	return (
		<main>
			<Heading className="mb-4">Your Modules</Heading>

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
