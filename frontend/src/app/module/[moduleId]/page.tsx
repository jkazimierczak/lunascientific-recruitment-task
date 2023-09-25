import { notFound } from "next/navigation";
import Link from "next/link";
import { ChevronLeft, Pencil } from "lucide-react";
import { getModuleById } from "@/api/modules";
import { AvailabilityChip, TemperatureChip } from "@/components";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/Heading";

type ModulePageProps = {
	params: {
		moduleId: string;
	};
};

export default async function ModulePage({ params: { moduleId } }: ModulePageProps) {
	const moduleInfo = await getModuleById(moduleId);

	if (!moduleInfo) {
		notFound();
	}

	const { name, available, targetTemperature, description } = moduleInfo;

	return (
		<main>
			<header className="mb-4 flex items-center gap-2">
				<Link href="/">
					<ChevronLeft />
				</Link>
				<Heading>{name}</Heading>
			</header>
			<div className="mb-4 ml-8 flex gap-2">
				<AvailabilityChip isAvailable={available} />
				{available && <TemperatureChip temperature={10} targetTemperature={targetTemperature} />}
			</div>
			<div className="mb-4">
				<h3 className="mb-1 text-lg font-bold">Description</h3>
				<p>{description}</p>
			</div>
			<Button className="w-full" asChild>
				<Link href={`/module/${moduleId}/edit`}>
					<Pencil className="mr-2 h-4 w-4" />
					Edit module
				</Link>
			</Button>
		</main>
	);
}
