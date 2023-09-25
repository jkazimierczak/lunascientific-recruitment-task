import { Circle } from "lucide-react";
import { clsx } from "clsx";

type AvailabilityChipProps = { isAvailable: boolean };

export function AvailabilityChip({ isAvailable }: AvailabilityChipProps) {
	const displayText = isAvailable ? "Available" : "Unavailable";

	return (
		<div className="bg-neutral-100 text-neutral-500 flex w-fit items-center gap-1.5 rounded px-1.5 py-0.5">
			<Circle
				className={clsx({
					"h-3 w-3": true,
					"text-primary fill-primary": isAvailable,
				})}
			/>
			{displayText}
		</div>
	);
}
