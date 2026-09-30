import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";

export const logoutRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/logout",
}).lazy(() => import("./lazy").then((d) => d.logoutLazyRoute));
