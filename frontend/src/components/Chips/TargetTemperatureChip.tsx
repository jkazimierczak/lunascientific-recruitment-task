import { Crosshair } from "lucide-react";
import { Chip } from "./Chip";

type TargetTemperatureChipProps = {
	targetTemperature: number;
};

export function TargetTemperatureChip({ targetTemperature }: TargetTemperatureChipProps) {
	return (
		<Chip tooltip="Target temperature">
			<Crosshair className="h-3 w-3" />
			{targetTemperature} °C
		</Chip>
	);
}
