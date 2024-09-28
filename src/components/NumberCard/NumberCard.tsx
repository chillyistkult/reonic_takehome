import { Card } from "@mantine/core";
import type { FC } from "react";

type NumberCardProps = {
  name: string;
  value: number | string;
};

const NumberCard: FC<NumberCardProps> = ({ name, value }) => {
  return (
    <Card
      withBorder
      key={name}
      className="overflow-hidden rounded-lg px-4 py-5 shadow sm:p-6"
    >
      <dt className="truncate font-medium text-gray-300 text-sm">{name}</dt>
      <dd className="mt-1 font-semibold text-3xl text-gray-100">{value}</dd>
    </Card>
  );
};

export default NumberCard;
