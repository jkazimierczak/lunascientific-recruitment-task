import { Circle } from "lucide-react";
import { clsx } from "clsx";
import { Chip } from "./Chip";

type AvailabilityChipProps = {
	isAvailable: boolean;
	text?: {
		available: string;
		unavailable: string;
	};
};

const defaultDisplayText = {
	available: "Available",
	unavailable: "Unavailable",
};

export function AvailabilityChip({
	isAvailable,
	text = defaultDisplayText,
}: AvailabilityChipProps) {
	const displayText = isAvailable ? text?.available : text?.unavailable;

	return (
		<Chip className="w-fit">
			<Circle
				className={clsx({
					"h-3 w-3": true,
					"fill-primary text-primary": isAvailable,
				})}
			/>
			{displayText}
		</Chip>
	);
}