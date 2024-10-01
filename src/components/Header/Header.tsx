import type { FC, PropsWithChildren } from "react";

const Header: FC<PropsWithChildren> = ({ children }) => {
  return (
    <header>
      <div className="mx-auto mb-4 max-w-7xl px-4 py-4 pt-8 sm:px-6 lg:px-8">
        <h1 className="font-bold text-3xl leading-tight">{children}</h1>
      </div>
    </header>
  );
};

export default Header;
