import { createRouter } from "@tanstack/react-router";
import { rootRoute } from "./rootRoute";
import { chatListRoute } from "./chat-list/route";
import { loginRoute } from "./login/route";

const routeTree = rootRoute.addChildren([chatListRoute, loginRoute]);

export const router = createRouter({
    routeTree,
});

declare module "@tanstack/react-router" {
    interface Register {
        router: typeof router;
    }
}
