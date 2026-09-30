import { IMaskInput } from "react-imask";
import { cn } from "src/shared/utils/cn";
import styles from "./PhoneInput.module.scss";
import type { FC } from "react";

interface Props {
    className?: string;
    error?: string;
    value: string;
    onChange: (value: string) => void;
    onFocus?: () => void;
    onBlur?: () => void;
}

function formatMasked(raw: string): string {
    const digits = raw.replace(/\D/g, "");
    let formatted = "+7";
    if (digits.length > 1) formatted += " (" + digits.slice(1, 4);
    if (digits.length >= 4) formatted += ")";
    if (digits.length > 4) formatted += " " + digits.slice(4, 7);
    if (digits.length > 7) formatted += "-" + digits.slice(7, 9);
    if (digits.length > 9) formatted += "-" + digits.slice(9, 11);
    return formatted;
}

export const PhoneInput: FC<Props> = ({ className, error, value, onChange, onFocus, onBlur }) => {
    const showError = !!error;
    const maskedValue = formatMasked(value);

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
