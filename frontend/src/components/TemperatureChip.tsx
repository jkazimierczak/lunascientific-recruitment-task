import { clsx } from "clsx";
import { Thermometer } from "lucide-react";

type TemperatureChipProps = {
	temperature: number;
	targetTemperature: number;
};

export function TemperatureChip({ temperature, targetTemperature }: TemperatureChipProps) {
	const temperatureWithinBoundary = Math.abs(temperature - targetTemperature) <= 0.5;

	return (
		<div
			className={clsx({
				"flex w-20 min-w-fit items-center justify-between gap-1.5 rounded bg-neutral-100 px-1.5 py-0.5":
					true,
				"text-success": temperatureWithinBoundary,
				"text-error": !temperatureWithinBoundary,
			})}
		>
			<Thermometer className="h-3 w-3 fill-current" />
			{temperature} °C
		</div>
	);
}
