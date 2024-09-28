class Vehicle {
  consumptionPerKilometer: number;
  arrivingProbabilities: number[];
  demandProbabilities: number[][];

  constructor(
    consumptionPerKilometer: number,
    arrivingProbabilities: number[],
    demandProbabilities: number[][],
  ) {
    this.consumptionPerKilometer = consumptionPerKilometer;
    this.arrivingProbabilities = arrivingProbabilities;
    this.demandProbabilities = demandProbabilities;
  }

  isArrivingByHour(hour: number): boolean {
    return (
      (this.arrivingProbabilities.find((_, index) => {
        return index <= hour && hour < index + 1;
      }) ?? 0) > Math.random()
    );
  }

  getChargingDemand() {
    // https://observablehq.com/@nextlevelshit/rejection-sampling-in-javascript
    const weighted = [].concat(
      ...(this.demandProbabilities.map(([weight, value]) =>
        Array(Math.ceil(weight * 100)).fill(value),
      ) as never[][]),
    );
    return weighted[Math.floor(Math.random() * weighted.length)];
  }
}

export default Vehicle;
