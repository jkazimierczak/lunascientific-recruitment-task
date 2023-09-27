import { AvailabilityChip } from "@/components/Chip";

type StatusbarProps = {
	isSocketConnected: boolean;
	className?: string;
};

export function Statusbar({ isSocketConnected, className }: StatusbarProps) {
	return (
		<div className={className}>
			<AvailabilityChip
				isAvailable={isSocketConnected}
				tooltip="Realtime data status"
				text={{ available: "Realtime", unavailable: "Realtime not available" }}
			/>
		</div>
	);
}
