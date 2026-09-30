import styles from "./RootLayout.module.scss";
import { Outlet, useNavigate, useLocation } from "@tanstack/react-router";
import type { FC } from "react";
import { cn } from "src/shared/utils/cn";
import { Button } from "src/shared/components/Button";
import { useLogout } from "src/features/logout";
import ExitIcon from "src/shared/ui/assets/icons/exit.svg?react";

export const RootLayout: FC = () => {
    const logout = useLogout();
    const navigate = useNavigate();
    const { pathname } = useLocation();

    const handleLogout = () => {
        logout();
        navigate({ to: "/login" });
    };

    const isLoginPage = pathname === "/login";

    return (
        <div className={cn(styles.rootLayout)}>
            <div className={cn(styles.pattern)} />
            {!isLoginPage && (
                <header className={cn(styles.header)}>
                    <Button variant="secondary" size="sm" onClick={handleLogout} className={styles.logoutButton}>
                        <ExitIcon />
                    </Button>
                </header>
            )}
            <div className={cn(styles.outlet)}>
                <Outlet />
            </div>
        </div>
    );
};
