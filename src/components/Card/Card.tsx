import { clsx } from "clsx";
import type { FC, HTMLAttributes } from "react";

const Card: FC<HTMLAttributes<HTMLDivElement>> = ({ className, ...rest }) => {
  return (
    <div
      {...rest}
      className={clsx(
        "overflow-hidden rounded-lg border border-neutral-600 bg-zinc-800 px-4 py-5 shadow",
        className,
      )}
    />
  );
};

export default Card;
