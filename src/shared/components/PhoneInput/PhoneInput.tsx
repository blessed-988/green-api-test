import { IMaskInput } from "react-imask";
import { cn } from "src/shared/utils/cn";
import styles from "./PhoneInput.module.scss";
import type { FC } from "react";
import { formatPhone } from "src/shared/utils/validatePhone";

interface Props {
    className?: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

export const PhoneInput: FC<Props> = ({ className, error, value, onChange, onFocus, onBlur }) => {
    const showError = !!error;
    const maskedValue = formatPhone(value);

    const handleAccept = (masked: string) => {
        const digits = masked.replace(/\D/g, "");
        onChange(digits);
    };

    return (
        <div className={styles.wrapper}>
            <div className={cn(styles.inputWrapper, showError && styles.inputWrapperError)}>
                <IMaskInput
                    onFocus={onFocus}
                    onBlur={onBlur}
                    mask="+7 (000) 000-00-00"
                    value={maskedValue}
                    onAccept={handleAccept}
                    placeholder="+7 (___) ___-__-__"
                    className={cn(styles.input, className)}
                    rows={1}
                />
            </div>
            {showError && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};
