import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";

const routeTree = rootRoute.addChildren([]);

export const router = createRouter({
    routeTree,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
