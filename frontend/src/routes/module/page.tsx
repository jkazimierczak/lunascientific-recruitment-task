import { ChevronLeft, Pencil } from "lucide-react";
import { Link } from "react-router-dom";
import { TargetTemperatureChip, AvailabilityChip, TemperatureChip } from "@/components/Chips";
import { Button } from "@/components/UI/Button";
import { Heading } from "@/components/Heading";
import { useGetModule } from "@/hooks/useGetModule";
import { useSocketData } from "@/api/modules/useSocketData";

export function ModulePage() {
	const { moduleInfo, isLoading } = useGetModule();
	const { getModuleReadingById } = useSocketData();
	const temperature = getModuleReadingById(moduleInfo?.id || "");

	if (isLoading) return <p>Loading</p>;

	if (!moduleInfo) {
		throw new Error("404: Module not found");
	}

	const { name, available, targetTemperature, description } = moduleInfo;

	return (
		<main>
			<header className="mb-4 flex items-center gap-2">
				<Link to="/">
					<ChevronLeft />
				</Link>
				<Heading>{name}</Heading>
			</header>
			<div className="mb-4 ml-8 flex gap-2">
				<AvailabilityChip isAvailable={available} />
				<TargetTemperatureChip targetTemperature={targetTemperature} />
				{available && temperature && (
					<TemperatureChip temperature={temperature} targetTemperature={targetTemperature} />
				)}
			</div>
			<div className="mb-4">
				<h3 className="mb-1 text-lg font-bold">Description</h3>
				<p>{description}</p>
			</div>
			<Button className="w-full" asChild>
				<Link to={`/module/${moduleInfo.id}/edit`}>
					<Pencil className="mr-2 h-4 w-4" />
					Edit module
				</Link>
			</Button>
		</main>
	);
}
