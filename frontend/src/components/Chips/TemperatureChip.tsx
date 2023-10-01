import { clsx } from "clsx";
import { Thermometer } from "lucide-react";
import { Chip } from "./Chip";

type TemperatureChipProps = {
	temperature: number;
	targetTemperature: number;
};

export function TemperatureChip({ temperature, targetTemperature }: TemperatureChipProps) {
	const temperatureWithinBoundary = Math.abs(temperature - targetTemperature) <= 0.5;

	return (
		<Chip
			tooltip="Current temperature"
			className={clsx({
				"justify-between animate-in fade-in": true,
				"text-success": temperatureWithinBoundary,
				"text-error": !temperatureWithinBoundary,
			})}
		>
			<Thermometer className="h-3 w-3 fill-current" />
			{temperature} °C
		</Chip>
	);
}
