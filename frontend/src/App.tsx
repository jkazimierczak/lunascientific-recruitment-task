import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { HomePage } from "@/routes/page";
import { Error } from "@/routes/error";
import { ModulePage } from "@/routes/module/page";
import { ModuleEditPage } from "@/routes/module/edit";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
		errorElement: <Error />,
	},
	{
		path: "module/:moduleId",
		element: <ModulePage />,
		errorElement: <Error />,
	},
	{
		path: "module/:moduleId/edit",
		element: <ModuleEditPage />,
		errorElement: <Error />,
	},
]);

export function App() {
	return (
		<div className="mx-auto flex h-0 min-h-screen max-w-sm flex-col">
			<div className="mx-5 my-6 flex-grow">
				<RouterProvider router={router} />
			</div>
		</div>
	);
}
