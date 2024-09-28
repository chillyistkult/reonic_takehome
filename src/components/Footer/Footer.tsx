import type { FC, PropsWithChildren } from "react";

const Footer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <footer>
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="py-4 text-center text-gray-500 text-sm sm:text-left">
          <span className="block sm:inline">{children}</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
