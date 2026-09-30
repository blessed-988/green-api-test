import styles from "./RootLayout.module.scss";
import { Outlet } from "@tanstack/react-router";
import classNames from "classnames";
import type { FC } from "react";

export const RootLayout: FC = () => {
    return (
        <div className={classNames(styles.rootLayout)}>
            <div className={classNames(styles.pattern)} />
            <Outlet />
        </div>
    );
};
