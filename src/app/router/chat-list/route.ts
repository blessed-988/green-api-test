import { createRoute } from "@tanstack/react-router";
import { rootRoute } from "../rootRoute";

export const chatListRoute = createRoute({
    getParentRoute: () => rootRoute,
    path: "/chat-list",
}).lazy(() => import("./lazy").then((d) => d.chatListLazyRoute));
