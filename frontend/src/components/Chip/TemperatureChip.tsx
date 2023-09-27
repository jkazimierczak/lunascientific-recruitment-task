import { clsx } from "clsx";
import { Thermometer } from "lucide-react";
import { Chip } from "@/components/Chip/Chip";

type TemperatureChipProps = {
	temperature: number;
	targetTemperature: number;
};

export function TemperatureChip({ temperature, targetTemperature }: TemperatureChipProps) {
	const temperatureWithinBoundary = Math.abs(temperature - targetTemperature) <= 0.5;

	return (
		<Chip
			className={clsx({
				"w-20 min-w-fit justify-between": true,
				"text-success": temperatureWithinBoundary,
				"text-error": !temperatureWithinBoundary,
			})}
		>
			<Thermometer className="h-3 w-3 fill-current" />
			{temperature} °C
		</Chip>
	);
}