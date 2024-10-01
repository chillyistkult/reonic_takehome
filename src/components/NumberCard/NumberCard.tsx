import type { FC } from "react";
import Card from "../Card/Card.tsx";

type NumberCardProps = {
  name: string;
  value: number | string;
};

const NumberCard: FC<NumberCardProps> = ({ name, value }) => {
  return (
    <Card>
      <dt className="truncate font-medium text-gray-300 text-sm">{name}</dt>
      <dd className="mt-1 font-semibold text-3xl text-gray-100">{value}</dd>
    </Card>
  );
};

export default NumberCard;
