import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface ChipProps extends ComponentProps<"div"> {
	children: React.ReactNode;
	className?: string;
	tooltip?: string;
}

function ChipLayout({ className, children, ...props }: ChipProps) {
	return (
		<div
			className={cn(
				"flex items-center gap-1.5 rounded bg-neutral-100 px-1.5 py-0.5 text-neutral-500",
				className,
			)}
			{...props}
		>
			{children}
		</div>
	);
}

export function Chip({ className, children, tooltip, ...props }: ChipProps) {
	const chip = (
		<ChipLayout className={className} {...props}>
			{children}
		</ChipLayout>
	);

	return tooltip ? (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger>{chip}</TooltipTrigger>
				<TooltipContent>
					<p>{tooltip}</p>
				</TooltipContent>
			</Tooltip>
		</TooltipProvider>
	) : (
		chip
	);
}
