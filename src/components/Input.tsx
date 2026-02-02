import type { InputHTMLAttributes, Ref } from "react";
import { useId } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  type?: string;
  className?: string;
  ref?: Ref<HTMLInputElement>; // Standard prop in React 19
}

function Input({ label, type, className = "", ref, ...props }: InputProps) {
  const id = useId();
  return (
    <div className="w-full flex flex-col">
      {label && (
        <label htmlFor={id} className="inline-block mb-1 pl-1 text-left">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`px-3 py-2 rounded-lg bg-white text-black outline focus:bg-gray-50 duration-200 border border-gray-200 w-full   ${className}`}
        {...props}
        id={id}
      />
    </div>
  );
}

export default Input;
