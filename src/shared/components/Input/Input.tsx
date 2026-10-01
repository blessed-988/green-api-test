import styles from "./Input.module.scss";
import type { FC, InputHTMLAttributes } from "react";
import { cn } from "src/shared/utils/cn";
import { Tooltip } from "src/shared/components/Tooltip";

interface Props extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    error?: string;
    label?: string;
    required?: boolean;
    touched?: boolean;
    tooltip?: string;
}

export const Input: FC<Props> = ({ className, error, label, required, touched, tooltip, ...rest }) => {
    const showError = touched && error;

    const renderLabel = () => (
        <label className={styles.label}>
            {label}
            {required && <span className={styles.required}>*</span>}
            {tooltip && (
                <Tooltip text={tooltip}>
                    <span />
                </Tooltip>
            )}
        </label>
    );

    return (
        <div className={styles.wrapper}>
            {tooltip ? <div className={styles.labelWithTooltip}>{renderLabel()}</div> : renderLabel()}
            <input className={cn(styles.input, showError && styles.error, className)} {...rest} />
            {showError && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};
