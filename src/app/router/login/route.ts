import { createRoute, redirect } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";
import { isAuthenticated } from "../../utils/isAuthenticated";

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
    beforeLoad: () => {
        if (isAuthenticated()) {
            throw redirect({ to: "/chat-list" });
        }

        return {};
    },
}).lazy(() => import("./lazy").then((d) => d.loginLazyRoute));
