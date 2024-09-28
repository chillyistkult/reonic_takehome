import type { FC, PropsWithChildren } from "react";

const Content: FC<PropsWithChildren> = ({ children }) => {
  return (
    <main>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="px-4 py-4 sm:px-0">
          <div className="font-normal leading-6 text-opacity-90">
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Content;
