import styles from "./Select.module.scss";
import type { FC, MouseEvent, KeyboardEvent } from "react";
import { useState, useRef, useEffect, useCallback } from "react";
import { cn } from "src/shared/utils/cn";
import { Tooltip } from "src/shared/components/Tooltip";

interface Option {
    value: string;
    label: string;
}

interface Props {
    className?: string;
    error?: string;
    label?: string;
    required?: boolean;
    touched?: boolean;
    options: readonly Option[];
    tooltip?: string;
    placeholder?: string;
    value?: string;
    onChange?: (value: string) => void;
    disabled?: boolean;
}

export const Select: FC<Props> = ({
    className,
    error,
    label,
    required,
    touched,
    options,
    tooltip,
    placeholder = "Выберите...",
    value,
    onChange,
    disabled,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const containerRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const selectedOption = options.find((opt) => opt.value === value);
    const showError = touched && error;

    const handleSelect = useCallback(
        (optionValue: string) => {
            setIsOpen(false);
            setHighlightedIndex(-1);
            onChange?.(optionValue);
        },
        [onChange],
    );

    const handleToggle = useCallback(
        (e: MouseEvent) => {
            e.stopPropagation();
            if (!disabled) {
                setIsOpen((prev) => !prev);
            }
        },
        [disabled],
    );

    const handleKeyDown = useCallback(
        (e: KeyboardEvent<HTMLDivElement>) => {
            if (!isOpen) {
                if (e.key === "Enter" || e.key === " " || e.key === "ArrowDown") {
                    e.preventDefault();
                    setIsOpen(true);
                }
                return;
            }

            switch (e.key) {
                case "ArrowDown":
                    e.preventDefault();
                    setHighlightedIndex((prev) => (prev < options.length - 1 ? prev + 1 : 0));
                    break;
                case "ArrowUp":
                    e.preventDefault();
                    setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : options.length - 1));
                    break;
                case "Enter":
                    e.preventDefault();
                    {
                        const option = options[highlightedIndex];
                        if (option) {
                            handleSelect(option.value);
                        }
                    }
                    break;
                case "Escape":
                    e.preventDefault();
                    setIsOpen(false);
                    break;
            }
        },
        [isOpen, options, highlightedIndex, handleSelect],
    );

    const handleOptionClick = useCallback(
        (optionValue: string) => (e: MouseEvent) => {
            e.stopPropagation();
            handleSelect(optionValue);
        },
        [handleSelect],
    );

    useEffect(() => {
        const handleClickOutside = (e: unknown) => {
            const mouseEvent = e as MouseEvent;
            if (containerRef.current && !containerRef.current.contains(mouseEvent.target as Node)) {
                setIsOpen(false);
                setHighlightedIndex(-1);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    useEffect(() => {
        if (isOpen && listRef.current && highlightedIndex >= 0) {
            const option = listRef.current.children[highlightedIndex] as HTMLElement;
            option?.scrollIntoView({ block: "nearest" });
        }
    }, [isOpen, highlightedIndex]);

    return (
        <div className={cn(styles.wrapper, className)} ref={containerRef}>
            <div className={styles.label}>
                {label}
                {required && <span className={styles.required}>*</span>}
                {tooltip && (
                    <Tooltip text={tooltip}>
                        <span />
                    </Tooltip>
                )}
            </div>

            <div
                className={cn(
                    styles.selectWrapper,
                    showError && styles.selectWrapperError,
                    isOpen && styles.selectWrapperOpen,
                    disabled && styles.selectWrapperDisabled,
                )}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                tabIndex={disabled ? undefined : 0}
                role="combobox"
                aria-expanded={isOpen}
                aria-haspopup="listbox"
                aria-readonly={disabled}
            >
                <span className={cn(styles.selectedValue, !selectedOption && styles.placeholder)}>
                    {selectedOption?.label || placeholder}
                </span>
                <svg
                    className={styles.arrow}
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <polyline points="6 9 12 15 18 9" />
                </svg>

                {isOpen && (
                    <ul ref={listRef} className={styles.dropdown} role="listbox">
                        {options.map((option, index) => (
                            <li
                                key={option.value}
                                className={cn(
                                    styles.option,
                                    option.value === value && styles.optionSelected,
                                    index === highlightedIndex && styles.optionHighlighted,
                                )}
                                role="option"
                                aria-selected={option.value === value}
                                onClick={handleOptionClick(option.value)}
                                onMouseEnter={() => setHighlightedIndex(index)}
                            >
                                {option.label}
                            </li>
                        ))}
                    </ul>
                )}
            </div>

            {showError && <span className={styles.errorText}>{error}</span>}
        </div>
    );
};
