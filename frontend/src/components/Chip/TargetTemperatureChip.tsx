import { Crosshair } from "lucide-react";
import { Chip } from "@/components/Chip/Chip";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

type TargetTemperatureChipProps = {
	targetTemperature: number;
};

export function TargetTemperatureChip({ targetTemperature }: TargetTemperatureChipProps) {
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>
					<Chip>
						<Crosshair className="h-3 w-3" />
						{targetTemperature} °C
					</Chip>
				</TooltipTrigger>
				<TooltipContent>
					<p>Target temperature</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	);
}
