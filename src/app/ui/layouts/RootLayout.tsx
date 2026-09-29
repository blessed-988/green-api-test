import { Outlet } from "@tanstack/react-router";
import type { FC } from "react";

export const RootLayout: FC = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Outlet />
        </div>
    );
};
