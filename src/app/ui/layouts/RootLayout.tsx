import { Outlet } from "@tanstack/react-router";
import type { FC } from "react";

export const RootLayout: FC = () => {
    return (
        <div>
            <Outlet />
        </div>
    );
};
