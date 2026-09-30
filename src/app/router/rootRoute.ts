import { createRootRoute, redirect } from "@tanstack/react-router";
import { RootLayout } from "../ui/layouts/RootLayout";
import { isAuthenticated } from "../utils/isAuthenticated";

export const rootRoute = createRootRoute({
    component: RootLayout,
    beforeLoad: ({ location }) => {
        const isLoginPath = location.pathname === "/login";

        if (!isAuthenticated() && !isLoginPath) {
            throw redirect({ to: "/login" });
        }

        return {};
    },
});
