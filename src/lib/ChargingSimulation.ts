import moment from "moment";
import type ChargingStation from "./ChargingStation.ts";
import type Vehicle from "./Vehicle.ts";

class ChargingSimulation {
  id: string;
  stations: ChargingStation[];
  vehicle: Vehicle;
  timeframe: number;
  interval: number;

  constructor(
    id: string,
    stations: ChargingStation[],
    vehicle: Vehicle,
    timeframe: number,
    interval: number,
  ) {
    this.id = id;
    this.stations = stations;
    this.vehicle = vehicle;
    this.timeframe = timeframe;
    this.interval = interval;
  }

  run() {
    const ticks: ChargingStation[][] = Array.from(
      new Array((this.timeframe * 24 * 60) / this.interval),
    );
    for (let i = 0; i < ticks.length; i++) {
      const minutes = this.interval * i;
      const offset = moment().startOf("year").add(minutes, "minutes").isDST()
        ? 1
        : 0;
      const hour = (minutes % (24 * 60)) / 60 + offset;

      for (let j = 0; j < this.stations.length; j++) {
        if (
          this.stations[j].chargingTime === 0 &&
          this.vehicle.isArrivingByHour(hour)
        ) {
          this.stations[j].start(
            moment
              .duration(
                ((this.vehicle.getChargingDemand() ?? 0) *
                  this.vehicle.consumptionPerKilometer) /
                  this.stations[j].power,
                "hours",
              )
              .asMinutes(),
          );
        } else {
          this.stations[j].update(this.interval);
        }
      }

      ticks[i] = this.stations.map((v) => Object.assign({}, v));
    }

    const totalChargingEvents = this.stations.reduce(
      (sum, { events }) => sum + events,
      0,
    );

    const totalPowerConsumed = this.stations.reduce(
      (sum, { totalPower }) => sum + totalPower,
      0,
    );

    const maxPowerConsumed = Math.max(
      ...ticks.map((stations) =>
        stations.reduce(
          (sum, { chargingTime, power }) =>
            chargingTime > 0 ? sum + power : sum,
          0,
        ),
      ),
    );
    const maxPowerAvailable = this.stations.reduce(
      (sum, { power }) => sum + power,
      0,
    );

    return {
      ticks,
      totalChargingEvents,
      totalPowerConsumed,
      maxPowerConsumed,
      maxPowerAvailable,
    };
  }
}

export default ChargingSimulation;
