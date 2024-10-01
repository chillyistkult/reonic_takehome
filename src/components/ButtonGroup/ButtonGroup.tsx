import { clsx } from "clsx";
import type { FC, ReactNode } from "react";

type ButtonGroupProps = {
  onChange: (value: string) => void;
  value: string;
  options: {
    value: string;
    label: ReactNode;
  }[];
};

const ButtonGroup: FC<ButtonGroupProps> = ({
  onChange,
  value: valueProp,
  options,
}) => {
  return (
    <div
      className="inline-flex h-9 w-full items-baseline justify-start rounded-lg bg-zinc-700 p-1 sm:w-auto"
      role="group"
    >
      {options.map(({ label, value }) => {
        const match = value === valueProp;
        return (
          <button
            onClick={() => onChange(value)}
            key={value}
            type="button"
            className={clsx(
              "group inline-flex h-7 w-full min-w-[32px] items-center justify-center gap-1.5 whitespace-nowrap rounded-md stroke-blue-700 px-3 py-2 align-middle font-semibold text-gray-200 text-xs drop-shadow transition-all duration-300 ease-in-out hover:stroke-blue-950 hover:text-white disabled:cursor-not-allowed disabled:stroke-slate-400 disabled:text-slate-400 sm:w-auto",
              {
                "rounded-md bg-zinc-600": match,
                "bg-transparent": !match,
              },
            )}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default ButtonGroup;
