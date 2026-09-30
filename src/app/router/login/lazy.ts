import { createLazyRoute } from "@tanstack/react-router";
import LoginPage from "src/pages/login";

export const loginLazyRoute = createLazyRoute("/login")({
    component: LoginPage,
});
