import { Link, useRouteError } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { Heading } from "@/components/Heading";
import { Button } from "@/components/UI/Button";

export function Error() {
	const error = useRouteError() as {
		statusText: string;
		message: string;
	};
	console.error(error);

	return (
		<div id="error-page">
			<Heading className="mb-4">Oops!</Heading>
			<p className="mb-1">Sorry, an unexpected error has occurred:</p>
			<pre className="rounded bg-neutral-900 px-4 py-2 text-white">
				{error.statusText || error.message}
			</pre>

			<Button asChild className="mt-4 w-full">
				<Link to="/">
					<ChevronLeft size={16} className="mr-2" />
					Return to main page
				</Link>
			</Button>
		</div>
	);
}
