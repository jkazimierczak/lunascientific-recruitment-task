import { Crosshair } from "lucide-react";
import { Chip } from "@/components/Chip/Chip";

type TargetTemperatureChipProps = {
	targetTemperature: number;
};

export function TargetTemperatureChip({ targetTemperature }: TargetTemperatureChipProps) {
	return (
		<Chip>
			<Crosshair className="h-3 w-3" />
			{targetTemperature} °C
		</Chip>
	);
}
