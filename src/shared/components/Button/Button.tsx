import { cn } from "src/shared/utils/cn";
import styles from "./Button.module.scss";
import type { FC, ButtonHTMLAttributes } from "react";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
    children: React.ReactNode;
}

export const Button: FC<Props> = ({
    variant = "primary",
    size = "md",
    className,
    disabled = false,
    children,
    ...rest
}) => {
    return (
        <button
            className={cn(styles.button, styles[variant], styles[size], disabled && styles.disabled, className)}
            disabled={disabled}
            {...rest}
        >
            {children}
        </button>
    );
};
