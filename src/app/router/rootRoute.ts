import { createRootRoute } from "@tanstack/react-router";
import { RootLayout } from "../ui/layouts/RootLayout";

export const rootRoute = createRootRoute({
    component: RootLayout,
});
