import styles from "./Card.module.scss";
import type { FC, ReactNode } from "react";
import { cn } from "src/shared/utils/cn";

interface Props {
    children: ReactNode;
    className?: string;
}

export const Card: FC<Props> = ({ children, className }) => {
    return <div className={cn(styles.card, className)}>{children}</div>;
};
