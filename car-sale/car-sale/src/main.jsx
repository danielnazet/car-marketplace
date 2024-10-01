import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./home";
import Contact from "./contact";
import { ClerkProvider } from "@clerk/clerk-react";
import Profile from "./profile";
import AddAuction from "./add-auction";
import { Toaster } from "./.../../components/ui/sonner";

const router = createBrowserRouter([
	{
		path: "/",
		element: <Home />,
	},
	{
		path: "/contact",
		element: <Contact />,
	},
	{
		path: "/profile",
		element: <Profile />,
	},
	{
		path: "/add-auction",
		element: <AddAuction />,
	},
]);

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
	throw new Error("Missing Publishable Key");
}

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
			<RouterProvider router={router} />
			<Toaster />
		</ClerkProvider>
	</StrictMode>
);