import { clsx } from "clsx";
import type { ButtonHTMLAttributes, FC } from "react";

interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "type"> {
  type?: "primary" | "default";
  htmlType?: ButtonHTMLAttributes<HTMLButtonElement>["type"];
}

const Button: FC<ButtonProps> = ({ type = "default", htmlType, ...rest }) => {
  return (
    <button
      {...rest}
      type={htmlType}
      className={clsx(
        "me-2 mb-2 rounded-lg px-5 py-2.5 font-medium text-sm text-white focus:outline-none focus:ring-4",
        {
          "bg-blue-600 hover:bg-blue-700 focus:ring-blue-800":
            type === "primary",
          "bg-gray-600 hover:bg-gray-700 focus:ring-gray-800":
            type === "default",
        },
      )}
    />
  );
};

export default Button;
