import { cn } from "src/shared/utils/cn";
import styles from "./Button.module.scss";
import type { FC, ButtonHTMLAttributes } from "react";
import { Loader } from "src/shared/components/Loader";

export type ButtonVariant = "primary" | "secondary";
export type ButtonSize = "sm" | "md" | "lg";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
    disabled?: boolean;
    loading?: boolean;
    children: React.ReactNode;
}

export const Button: FC<Props> = ({
    variant = "primary",
    size = "md",
    className,
    disabled = false,
    loading = false,
    children,
    ...rest
}) => {
    return (
        <button
            className={cn(
                styles.button,
                styles[variant],
                styles[size],
                (disabled || loading) && styles.disabled,
                className,
            )}
            disabled={disabled || loading}
            {...rest}
        >
            {loading && <Loader />}
            {!loading && children}
        </button>
    );
};
