import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";

export const loginRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/login",
}).lazy(() => import("./lazy").then((d) => d.loginLazyRoute));
