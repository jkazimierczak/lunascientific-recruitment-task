import { Circle } from "lucide-react";
import { clsx } from "clsx";

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
		<div className="flex w-fit items-center gap-1.5 rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-500">
			<Circle
				className={clsx({
					"h-3 w-3": true,
					"fill-primary text-primary": isAvailable,
				})}
			/>
			{displayText}
		</div>
	);
}
