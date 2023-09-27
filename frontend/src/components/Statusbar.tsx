import { Ring } from "@uiball/loaders";
import { AvailabilityChip, Chip } from "@/components/Chip";

type StatusbarProps = {
	isSocketConnected: boolean;
	className?: string;
};

export function Statusbar({ isSocketConnected, className }: StatusbarProps) {
	return (
		<div className={className}>
			{isSocketConnected ? (
				<AvailabilityChip
					isAvailable={isSocketConnected}
					tooltip="Connection status"
					text="Realtime"
				/>
			) : (
				<Chip className="w-fit" tooltip="Connection status">
					<Ring size={12} />
					Connecting
				</Chip>
			)}
		</div>
	);
}
