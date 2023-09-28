import { useRouteError } from "react-router-dom";
import { Heading } from "@/components/Heading";

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
		</div>
	);
}
