import { Circle } from "lucide-react";
import { clsx } from "clsx";
import { Chip } from "./Chip";

type AvailabilityChipProps = {
	isAvailable: boolean;
	text?:
		| string
		| {
				available: string;
				unavailable: string;
		  };
	tooltip?: string;
};

const defaultDisplayText = {
	available: "Available",
	unavailable: "Unavailable",
};
const defaultTooltip = "Module availability";

export function AvailabilityChip({
	isAvailable,
	text = defaultDisplayText,
	tooltip = defaultTooltip,
}: AvailabilityChipProps) {
	const getDisplayText = () => {
		if (typeof text === "string") {
			return text;
		}
		return isAvailable ? text?.available : text?.unavailable;
	};

	return (
		<Chip className="w-fit" tooltip={tooltip}>
			<Circle
				className={clsx({
					"h-3 w-3": true,
					"fill-primary text-primary": isAvailable,
				})}
			/>
			{getDisplayText()}
		</Chip>
	);
}
