class ChargingStation {
  power: number;
  totalPower: number;
  chargingTime: number;
  events: number;

  constructor(power: number) {
    this.power = power;
    this.totalPower = 0;
    this.chargingTime = 0;
    this.events = 0;
  }

  start(chargingTime = 0) {
    this.events += 1;
    this.chargingTime = chargingTime;
    this.totalPower = this.totalPower + (chargingTime / 60) * this.power;
  }

  update(interval: number) {
    this.chargingTime = this.chargingTime - interval;

    if (this.chargingTime <= 0) {
      this.end();
    }
  }

  end() {
    this.chargingTime = 0;
  }
}

export default ChargingStation;
