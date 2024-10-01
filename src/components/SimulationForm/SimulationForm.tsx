import type { FC } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";
import Button from "../Button/Button.tsx";
import Checkbox from "../Checkbox/Checkbox.tsx";
import FormInput from "../FormInput/FormInput.tsx";

export type FormValues = {
  timeframe: number;
  interval: number;
  chargingStations: number;
  chargingStationPower: number;
  vehiclePowerDemand: number;
  vehicleArrivalProbabilityFactor: number;
  newSeed: boolean;
};

type FormProps = {
  onSubmit: SubmitHandler<FormValues>;
  onReset?: () => void;
};

const defaultValues = {
  timeframe: 365,
  interval: 15,
  chargingStations: 20,
  chargingStationPower: 11,
  vehiclePowerDemand: 18,
  vehicleArrivalProbabilityFactor: 1,
  newSeed: true,
};

const Form: FC<FormProps> = ({ onSubmit, onReset: onResetProp }) => {
  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues,
  });

  const onReset = () => {
    reset();
    onResetProp?.();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
      <div className="mb-5">
        <FormInput
          required
          type="number"
          label="Timeframe"
          error={errors.timeframe?.message}
          affix="Days"
          {...register("timeframe", {
            required: "Timeframe is required.",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Minimum timeframe is 1.",
            },
            max: {
              value: 1095,
              message: "Maximum timeframe is 1095.",
            },
          })}
        />
      </div>
      <div className="mb-5">
        <FormInput
          required
          type="number"
          label="Interval"
          error={errors.interval?.message}
          affix="Minutes"
          {...register("interval", {
            required: "Interval is required.",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Minimum interval is 1.",
            },
            max: {
              value: 60,
              message: "Maximum interval is 60.",
            },
          })}
        />
      </div>
      <div className="mb-5">
        <FormInput
          required
          type="number"
          label="Charging Stations"
          error={errors.chargingStations?.message}
          {...register("chargingStations", {
            required: "Charging stations are required.",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "At least 1 charging stations is required.",
            },
          })}
        />
      </div>
      <div className="mb-5">
        <FormInput
          affix="kW"
          required
          type="number"
          label="Charging Station Power"
          error={errors.chargingStationPower?.message}
          {...register("chargingStationPower", {
            required: "Charging station power is required.",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Minimum charging station power is 1.",
            },
          })}
        />
      </div>
      <div className="mb-5">
        <FormInput
          required
          type="number"
          affix="kWh"
          label="Vehicle Power Demand"
          error={errors.vehiclePowerDemand?.message}
          {...register("vehiclePowerDemand", {
            required: "Vehicle power demand is required.",
            valueAsNumber: true,
            min: {
              value: 1,
              message: "Minimum vehicle power demand is 1.",
            },
          })}
        />
      </div>
      <div className="mb-5">
        <FormInput
          type="number"
          label="Vehicle Arrival Probability Factor"
          error={errors.vehicleArrivalProbabilityFactor?.message}
          {...register("vehicleArrivalProbabilityFactor", {
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="mb-5">
        <Controller
          control={control}
          render={({ field: { value, onChange, ...field } }) => (
            <Checkbox
              checked={value}
              onChange={onChange}
              label="New Seed for Randomization"
              {...field}
            />
          )}
          name="newSeed"
        />
      </div>
      <div className="space-x-4">
        <Button type="primary" htmlType="submit">
          Simulate
        </Button>
        <Button onClick={onReset}>Reset</Button>
      </div>
    </form>
  );
};

export default Form;
