import styles from "./Input.module.scss";
import type { FC, InputHTMLAttributes } from "react";
import { cn } from "src/shared/utils/cn";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    error?: string;
    label?: string;
    required?: boolean;
    touched?: boolean;
}

export const Input: FC<Props> = ({ className, error, label, required, touched, ...rest }) => {
    const showError = touched && error;

    return (
        <div className={styles.wrapper}>
            <label className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
            </label>
            <input className={cn(styles.input, showError && styles.error, className)} {...rest} />
            {showError && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};
