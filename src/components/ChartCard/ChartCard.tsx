import { Card } from "@mantine/core";
import type { FC, PropsWithChildren, ReactNode } from "react";

type ChartCardProps = {
  name: ReactNode;
};

const ChartCard: FC<PropsWithChildren<ChartCardProps>> = ({
  name,
  children,
}) => {
  return (
    <Card
      withBorder
      className="overflow-hidden rounded-lg px-4 py-5 shadow sm:p-6"
    >
      <dt className="truncate font-medium text-gray-300 text-sm">{name}</dt>
      <dd className="mt-4">{children}</dd>
    </Card>
  );
};

export default ChartCard;
