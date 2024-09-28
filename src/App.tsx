import history from "history/browser";
import { useCallback, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import seedrandom from "seedrandom";
import { v4 as uuid } from "uuid";
import ChargingStationCard from "./components/ChargingStationCard/ChargingStationCard.tsx";
import Content from "./components/Content/Content.tsx";
import Footer from "./components/Footer/Footer.tsx";
import Header from "./components/Header/Header.tsx";
import NumberCard from "./components/NumberCard/NumberCard.tsx";
import Form, {
  type FormValues,
} from "./components/SimulationForm/SimulationForm.tsx";
import arrivalProbabilities from "./constants/arrival_probabilities.json";
import dps from "./constants/charging_demand_probabilities.json";
import ChargingSimulation from "./lib/ChargingSimulation.ts";
import ChargingStation from "./lib/ChargingStation.ts";
import Vehicle from "./lib/Vehicle.ts";
import { formatInteger, formatPercent } from "./utils/format.ts";

function App() {
  const [id, setId] = useState<string>(
    history.location.pathname.split("/").pop() || uuid(),
  );

  const [simulation, setSimulation] = useState<ChargingSimulation>();
  const [totalPowerConsumed, setTotalPowerConsumed] = useState<number>(0);
  const [maxPowerConsumed, setMaxPowerConsumed] = useState<number>(0);
  const [maxPowerAvailable, setMaxPowerAvailable] = useState<number>(0);

  const concurrencyFactor = maxPowerConsumed / maxPowerAvailable || 0;

  history.listen(({ location }) => {
    const id = location.pathname.split("/").pop();
    if (id) {
      setId(id);
    }
  });

  const onSubmit: SubmitHandler<FormValues> = useCallback(
    ({
      timeframe,
      interval,
      chargingStations,
      chargingStationPower,
      vehiclePowerDemand,
      vehicleArrivalProbabilityFactor,
      newSeed,
    }) => {
      const seed = newSeed ? uuid() : id;
      history.push(`/${seed}`);

      // Seeds Math.random();
      seedrandom(seed, { global: true });

      const stations = Array.from(new Array(chargingStations)).map(
        () => new ChargingStation(chargingStationPower),
      );

      const vehicle = new Vehicle(
        vehiclePowerDemand / 100,
        arrivalProbabilities.map(
          (value) => value * vehicleArrivalProbabilityFactor,
        ),
        dps,
      );

      const simulation = new ChargingSimulation(
        id,
        stations,
        vehicle,
        timeframe,
        interval,
      );

      const { totalPowerConsumed, maxPowerAvailable, maxPowerConsumed } =
        simulation.run();

      setSimulation(simulation);
      setTotalPowerConsumed(totalPowerConsumed);
      setMaxPowerConsumed(maxPowerConsumed);
      setMaxPowerAvailable(maxPowerAvailable);
    },
    [id],
  );

  return (
    <div className="min-h-screen bg-zinc-800 text-white">
      <Header>Charging Station Simulation</Header>
      <Content>
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div>
            <Form
              onSubmit={onSubmit}
              onReset={() => {
                setId(uuid());
                history.push("/");
              }}
            />
          </div>
          <div>
            <div className="mt-7 grid grid-cols-1 gap-8 lg:grid-cols-2">
              <NumberCard
                name="Total Energy Charged"
                value={`${formatInteger(totalPowerConsumed)} kWh`}
              />
              <NumberCard
                name="Concurrency Factor"
                value={formatPercent(concurrencyFactor, {
                  maximumFractionDigits: 0,
                  minimumFractionDigits: 0,
                })}
              />
              <NumberCard
                name="Theor. Max. Power Demand"
                value={`${formatInteger(maxPowerAvailable)} kW`}
              />
              <NumberCard
                name="Actual Max. Power Demand"
                value={`${formatInteger(maxPowerConsumed)} kW`}
              />
            </div>
            <div className="mt-8 grid grid-cols-1 gap-8">
              <ChargingStationCard
                timeframe={simulation?.timeframe}
                stations={simulation?.stations}
              />
            </div>
          </div>
        </div>
      </Content>
      <Footer>
        Made with <span className="text-red-500">&hearts;</span> in Brieselang.
      </Footer>
    </div>
  );
}

export default App;
