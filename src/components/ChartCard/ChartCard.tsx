import type { FC, PropsWithChildren, ReactNode } from "react";
import Card from "../Card/Card.tsx";

type ChartCardProps = {
  name: ReactNode;
};

const ChartCard: FC<PropsWithChildren<ChartCardProps>> = ({
  name,
  children,
}) => {
  return (
    <Card>
      <dt className="truncate font-medium text-gray-300 text-sm">{name}</dt>
      <dd className="mt-4">{children}</dd>
    </Card>
  );
};

export default ChartCard;
