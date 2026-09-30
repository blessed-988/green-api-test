import styles from "./Card.module.scss";
import type { FC, ReactNode } from "react";
import { cn } from "src/shared/utils/cn";

interface Props {
    children: ReactNode;
    className?: string;
    hoverable?: boolean;
    clickable?: boolean;
    onClick?: () => void;
}

export const Card: FC<Props> = ({ children, className, hoverable = false, clickable = false, onClick }) => {
    return (
        <div
            className={cn(styles.card, hoverable && styles.hoverable, clickable && styles.clickable, className)}
            onClick={clickable ? onClick : undefined}
        >
            {children}
        </div>
    );
};
