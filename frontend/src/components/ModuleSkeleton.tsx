import { Skeleton } from "@/components/ui/skeleton";

export function ModuleSkeleton() {
	return (
		<div className="cursor-progress rounded border border-neutral-300/80 px-4 py-2 transition-all">
			<Skeleton className="mb-2 h-7 w-3/5" />
			<Skeleton className="h-7" />
		</div>
	);
}
