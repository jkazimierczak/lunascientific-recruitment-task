import { AvailabilityChip, TemperatureChip, TargetTemperatureChip } from "@/components/Chips";
import { type ModuleInfo } from "@/api/types";

type ModuleProps = {
	module: ModuleInfo;
	temperature: number | null;
};

export function Module({
	module: { name, available, targetTemperature },
	temperature,
}: ModuleProps) {
	return (
		<div className="rounded border border-neutral-300/80 px-4 py-2 transition-all hover:border-primary hover:shadow">
			<h2 className="mb-2 text-xl font-semibold">{name}</h2>
			<div className="flex gap-2">
				<AvailabilityChip isAvailable={available} />
				<TargetTemperatureChip targetTemperature={targetTemperature} />
				{(temperature || temperature === 0) && available && (
					<TemperatureChip temperature={temperature} targetTemperature={targetTemperature} />
				)}
			</div>
		</div>
	);
}
