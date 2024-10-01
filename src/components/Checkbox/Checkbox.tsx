import { clsx } from "clsx";
import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: ReactNode;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, className, name, ...rest }, ref) => {
    return (
      <div className="mb-4 flex items-center">
        <input
          {...rest}
          ref={ref}
          type="checkbox"
          name={name}
          className={clsx(
            "h-4 w-4 rounded border-gray-300 bg-gray-100 text-blue-600 focus:ring-2 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:ring-offset-gray-800 dark:focus:ring-blue-600",
            className,
          )}
        />
        {label && (
          <label
            htmlFor={name}
            className="ms-2 font-medium text-gray-900 text-sm dark:text-gray-300"
          >
            {label}
          </label>
        )}
      </div>
    );
  },
);

export default Checkbox;
