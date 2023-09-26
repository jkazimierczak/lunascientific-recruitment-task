import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./app/globals.css";
import ReactDOM from "react-dom/client";
import React from "react";
import { RootRoute } from "@/routes/root";

const router = createBrowserRouter([
	{
		path: "/",
		element: <RootRoute />,
	},
]);

// eslint-disable-next-line import/no-named-as-default-member
ReactDOM.createRoot(document.querySelector("#root")!).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>,
);
