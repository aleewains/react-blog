import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Loader2 } from "lucide-react"; // Optional: for the loading state

type Variant = "primary" | "secondary" | "ghost" | "danger" | "outline";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

const baseStyles =
  "inline-flex items-center justify-center rounded-md font-medium transition-all duration-200 " +
  "focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 " +
  "active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  // Uses your gold accent and ensures contrast with text-on-accent
  primary: "bg-accent text-text-onAccent hover:bg-accent-hover shadow-soft",

  // Subtle blending with the background
  secondary:
    "bg-bg-muted text-text-primary hover:bg-bg-surface border border-border-subtle",

  // High-contrast outline for a clean look
  outline:
    "bg-transparent border border-border text-text-primary hover:bg-accent-soft hover:border-accent",

  // Minimalist ghost styling
  ghost:
    "bg-transparent text-text-secondary hover:text-text-primary hover:bg-bg-muted",

  // Semantic danger state
  danger:
    "bg-red-500/10 text-red-600 border border-red-500/20 hover:bg-red-600 hover:text-white",
};

const sizes: Record<Size, string> = {
  sm: "px-3 py-1.5 text-xs tracking-wide",
  md: "px-5 py-2.5 text-sm",
  lg: "px-8 py-3.5 text-base font-semibold tracking-tight",
};

function Button({
  children,
  variant = "primary",
  size = "md",
  isLoading = false,
  leftIcon,
  rightIcon,
  className = "",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading && (
        <Loader2 className="mr-2 h-4 w-4 animate-spin opacity-70" />
      )}

      {!isLoading && leftIcon && <span className="mr-2">{leftIcon}</span>}
      <span className={variant === "primary" ? "font-sans" : "font-sans"}>
        {children}
      </span>
      {!isLoading && rightIcon && <span className="ml-2">{rightIcon}</span>}
    </button>
  );
}

export default Button;
