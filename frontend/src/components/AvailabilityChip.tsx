import { Circle } from "lucide-react";
import { clsx } from "clsx";

type AvailabilityChipProps = { isAvailable: boolean };

export function AvailabilityChip({ isAvailable }: AvailabilityChipProps) {
	const displayText = isAvailable ? "Available" : "Unavailable";

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
