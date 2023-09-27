import { type ComponentProps } from "react";
import { cn } from "@/lib/utils";

interface ChipProps extends ComponentProps<"div"> {
	className?: string;
	children: React.ReactNode;
}

export function Chip({ className, children, ...props }: ChipProps) {
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
