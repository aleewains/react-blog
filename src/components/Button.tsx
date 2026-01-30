import type { ButtonHTMLAttributes, ReactNode } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  bgColor?: string; // Added ? because these have defaults
  textColor?: string;
  className?: string;
}

function Button({
  children,
  type = "button",
  bgColor = "bg-amber-600",
  textColor = "text-white",
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={`px-4 py-2 rounded-lg duration-200 ${bgColor} ${textColor} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export default Button;
