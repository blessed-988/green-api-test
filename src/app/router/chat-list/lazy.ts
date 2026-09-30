import { createLazyRoute } from "@tanstack/react-router";
import ChatListPage from "src/pages/chat-list";

export const chatListLazyRoute = createLazyRoute("/chat-list")({
    component: ChatListPage,
});
