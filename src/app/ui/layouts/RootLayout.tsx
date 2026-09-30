import styles from "./RootLayout.module.scss";
import { Outlet } from "@tanstack/react-router";
import type { FC } from "react";
import { cn } from "src/shared/utils/cn";

export const RootLayout: FC = () => {
    return (
        <div className={cn(styles.rootLayout)}>
            <div className={cn(styles.pattern)} />
            <div className={cn(styles.outlet)}>
                <Outlet />
            </div>
        </div>
    );
};
