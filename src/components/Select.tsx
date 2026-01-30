import type { SelectHTMLAttributes, Ref } from "react";
import { useId } from "react";

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: string[];
  label?: string;
  type?: string;
  className?: string;
  ref?: Ref<HTMLSelectElement>; // Standard prop in React 19
}

function Select({
  options = [],
  label,
  className = "",
  ref,
  ...props
}: SelectProps) {
  const id = useId();
  return (
    <div className="w-full">
      {label && <label htmlFor={id}>{label}</label>}
      <select
        {...props}
        ref={ref}
        id={id}
        className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default Select;
