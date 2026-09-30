import { createLazyRoute } from "@tanstack/react-router";
import LogoutPage from "src/pages/logout";

export const logoutLazyRoute = createLazyRoute("/logout")({
    component: LogoutPage,
});
