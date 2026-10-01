import styles from "./Tooltip.module.scss";
import type { FC, ReactNode } from "react";
import { useState, useCallback } from "react";

interface Props {
    text: string;
    children: ReactNode;
}

export const Tooltip: FC<Props> = ({ text, children }) => {
    const [isVisible, setIsVisible] = useState(false);

    const show = useCallback(() => setIsVisible(true), []);
    const hide = useCallback(() => setIsVisible(false), []);

    return (
        <div className={styles.wrapper}>
            <div className={styles.content}>
                {children}
                <button
                    type="button"
                    className={styles.infoButton}
                    onMouseEnter={show}
                    onMouseLeave={hide}
                    onFocus={show}
                    onBlur={hide}
                    tabIndex={0}
                >
                    ?
                </button>
            </div>
            {isVisible && (
                <div className={styles.tooltip} onMouseEnter={show} onMouseLeave={hide}>
                    {text}
                </div>
            )}
        </div>
    );
};
