import type { FC } from "react";
import { useLogout } from "src/features/logout";

export const LogoutPage: FC = () => {
    const logout = useLogout();

    return (
        <div>
            <button onClick={logout}>logout</button>
        </div>
    );
};
