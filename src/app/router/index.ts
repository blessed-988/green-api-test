import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { loginRoute } from "./login/route";
import { logoutRoute } from "./logout/route";

const routeTree = rootRoute.addChildren([loginRoute, logoutRoute]);

export const router = createRouter({
    routeTree,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
