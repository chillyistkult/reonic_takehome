import { AreaChart } from "@mantine/charts";
import { SegmentedControl } from "@mantine/core";
import { type FC, useMemo, useState } from "react";
import type ChargingStation from "../../lib/ChargingStation.ts";
import { formatInteger } from "../../utils/format.ts";
import ChartCard from "../ChartCard/ChartCard.tsx";

enum Granularity {
  Total = "Total",
  Month = "Month",
  Week = "Week",
  Day = "Day",
}

type ChargingStationCardProps = {
  stations?: ChargingStation[];
  timeframe?: number;
};

const ChargingStationCard: FC<ChargingStationCardProps> = ({
  stations,
  timeframe = 0,
}) => {
  const [granularity, setGranularity] = useState<Granularity>(
    Granularity.Total,
  );

  const factor = useMemo(() => {
    if (granularity === Granularity.Month) {
      return 30;
    }

    if (granularity === Granularity.Week) {
      return 7;
    }

    if (granularity === Granularity.Day) {
      return 1;
    }

    return timeframe;
  }, [granularity, timeframe]);

  const data = useMemo(
    () =>
      (stations || []).map(({ totalPower, events }, index) => ({
        id: `Station ${index + 1}`,
        totalPower: (totalPower / timeframe) * factor,
        events: (events / timeframe) * factor,
      })),
    [stations, factor, timeframe],
  );

  return (
    <ChartCard
      name={
        <div className="flex items-center justify-between">
          <span>Charging Stations</span>
          <SegmentedControl
            value={granularity}
            size="xs"
            onChange={(value) => setGranularity(value as Granularity)}
            data={Object.values(Granularity)}
            transitionDuration={500}
            transitionTimingFunction="linear"
          />
        </div>
      }
    >
      <AreaChart
        h={300}
        data={data}
        valueFormatter={formatInteger}
        dataKey="id"
        legendProps={{
          align: "left",
        }}
        series={[
          {
            name: "totalPower",
            label: "Energy Charged",
            color: "indigo.6",
          },
          {
            name: "events",
            label: "Charging Events",
            color: "blue.6",
          },
        ]}
        withLegend
        withYAxis={false}
        withXAxis={false}
        curveType="natural"
      />
    </ChartCard>
  );
};

export default ChargingStationCard;
