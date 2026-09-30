import { cn } from "src/shared/utils/cn";
import type { ElementType, FC } from "react";

interface TypographyProps<E extends ElementType> {
    as?: E;
    variant?: "h1" | "h2" | "h3" | "p" | "caption";
    className?: string;
    children: React.ReactNode;
}

type VariantStyles = Record<Required<TypographyProps<"p">>["variant"], string>;

const variantStyles: VariantStyles = {
    h1: "text-2xl font-semibold text-white",
    h2: "text-xl font-semibold text-white",
    h3: "text-lg font-semibold text-white",
    p: "text-base text-white/80",
    caption: "text-sm text-white/50",
};

export const Typography: FC<TypographyProps<any>> = ({ as, variant = "p", className, children, ...rest }) => {
    const Component = as || variant || "p";

    return (
        <Component className={cn(variantStyles[variant], className)} {...rest}>
            {children}
        </Component>
    );
};
