import { clsx } from "clsx";
import { type InputHTMLAttributes, type ReactNode, forwardRef } from "react";

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  affix?: ReactNode;
  label?: ReactNode;
  error?: ReactNode;
}

const FormInput = forwardRef<HTMLInputElement, FormInputProps>(
  ({ affix, className, name, label, error, type, required, ...rest }, ref) => {
    return (
      <>
        {label && (
          <label
            htmlFor={name}
            className="mb-2 block font-medium text-sm text-white"
          >
            {label}
            {required && <span className="ml-1 text-red-600">*</span>}
          </label>
        )}
        <div className="relative mb-2">
          {affix && (
            <div
              className={clsx(
                "pointer-events-none absolute inset-y-0 end-3 flex items-center text-gray-400",
              )}
            >
              {affix}
            </div>
          )}
          <input
            {...rest}
            ref={ref}
            type={type}
            name={name}
            className={clsx(
              "block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-sm text-white placeholder-gray-400",
              className,
            )}
          />
        </div>
        {error && (
          <p className="text-red-600 text-sm dark:text-red-500">
            <span className="font-medium">{error}</span>
          </p>
        )}
      </>
    );
  },
);

export default FormInput;
