import { type ModuleInfo } from "@/api/types";
import { AvailabilityChip } from "@/components/AvailabilityChip";
import { TemperatureChip } from "@/components/TemperatureChip";

export function Module({ module: { name, available, targetTemperature } }: { module: ModuleInfo }) {
	return (
		<div className="rounded border border-neutral-300/80 px-4 py-2 transition-all hover:border-primary hover:shadow">
			<h2 className="mb-2 text-xl font-semibold">{name}</h2>
			<div className="flex gap-2">
				<AvailabilityChip isAvailable={available} />
				{available && <TemperatureChip temperature={10} targetTemperature={targetTemperature} />}
			</div>
		</div>
	);
}
