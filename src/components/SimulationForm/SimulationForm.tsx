import { Button, Checkbox, TextInput } from "@mantine/core";
import { type FC, useCallback } from "react";
import { Controller, type SubmitHandler, useForm } from "react-hook-form";

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
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    defaultValues,
  });

  const onReset = useCallback(() => {
    reset();
    onResetProp?.();
  }, [reset, onResetProp]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg">
      <div className="mb-5">
        <TextInput
          required
          label="Timeframe"
          error={errors.timeframe?.message}
          rightSectionWidth="60"
          rightSection="Days"
          {...register("timeframe", { required: true, valueAsNumber: true })}
        />
      </div>
      <div className="mb-5">
        <TextInput
          required
          label="Interval"
          error={errors.interval?.message}
          rightSectionWidth="80"
          rightSection="Minutes"
          {...register("interval", { required: true, valueAsNumber: true })}
        />
      </div>
      <div className="mb-5">
        <TextInput
          required
          label="Charging Stations"
          error={errors.chargingStations?.message}
          {...register("chargingStations", {
            required: true,
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="mb-5">
        <TextInput
          rightSectionWidth="40"
          rightSection="kW"
          required
          label="Charging Station Power"
          error={errors.chargingStationPower?.message}
          {...register("chargingStationPower", {
            required: true,
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="mb-5">
        <TextInput
          required
          label="Vehicle Power Demand"
          error={errors.vehiclePowerDemand?.message}
          rightSectionWidth="50"
          rightSection="kWh"
          {...register("vehiclePowerDemand", {
            required: true,
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="mb-5">
        <TextInput
          required
          label="Vehicle Arrival Probability Factor"
          error={errors.vehicleArrivalProbabilityFactor?.message}
          {...register("vehicleArrivalProbabilityFactor", {
            required: true,
            valueAsNumber: true,
          })}
        />
      </div>
      <div className="mb-5">
        <Controller
          control={control}
          render={({
            field: { value, onChange, ...field },
            fieldState: { error },
          }) => (
            <Checkbox
              checked={value}
              onChange={onChange}
              error={error?.message}
              label="New Seed for Randomization"
              {...field}
            />
          )}
          name="newSeed"
        />
      </div>
      <div className="space-x-4">
        <Button
          loading={isSubmitting}
          type="submit"
          variant="gradient"
          gradient={{ from: "blue", to: "cyan", deg: 90 }}
        >
          Simulate
        </Button>
        <Button onClick={onReset} variant="filled" color="gray">
          Reset
        </Button>
      </div>
    </form>
  );
};

export default Form;
