import { Circle } from "lucide-react";
import { clsx } from "clsx";
import { Ring } from "@uiball/loaders";
import { Chip } from "./Chip";
import { getStatesFromConnections } from "@/lib/connections";

type StatusChipProps = {
	isSocketConnected: boolean;
	isServerConnected: boolean;
	className?: string;
};

export function StatusChip({ isSocketConnected, isServerConnected, className }: StatusChipProps) {
	const { isConnected, isOnlyServerConnected, isOnlySocketConnected, isDisconnected } =
		getStatesFromConnections(isSocketConnected, isServerConnected);

	function getStatusText() {
		if (isOnlyServerConnected) {
			return "Awaiting realtime-data";
		} else if (isConnected) {
			return "Connected";
		} else if (isOnlySocketConnected) {
			return "Awaiting module info";
		} else {
			return "Awaiting connection";
		}
	}

	return (
		<div className={className}>
			{!isDisconnected ? (
				<Chip className="w-fit" tooltip="Connection status">
					<Circle
						className={clsx({
							"h-3 w-3": true,
							"fill-success text-success": isConnected,
							"fill-warning text-warning": isOnlyServerConnected || isOnlySocketConnected,
						})}
					/>
					{getStatusText()}
				</Chip>
			) : (
				<Chip className="w-fit" tooltip="Connection status">
					<Ring size={12} />
					{getStatusText()}
				</Chip>
			)}
		</div>
	);
}
