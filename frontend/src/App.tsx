import { createBrowserRouter, RouterProvider } from "react-router-dom";
import React from "react";
import { HomeRoute } from "@/routes/home";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomeRoute />,
	},
]);

export function App() {
	return (
		<div className="mx-5 my-6 flex h-0 min-h-screen flex-col">
			<RouterProvider router={router} />
		</div>
	);
}
