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
				"bg-neutral-100 flex w-fit items-center gap-1.5 rounded px-1.5 py-0.5": true,
				"text-success": temperatureWithinBoundary,
				"text-error": !temperatureWithinBoundary,
			})}
		>
			<Thermometer className="fill-current h-3 w-3" />
			{temperature} °C
		</div>
	);
}
