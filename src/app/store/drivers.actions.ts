import { createAction, props } from "@ngrx/store";

export const updatePrimaryVehicle = createAction(
  "[Driver Component] Update Primary Vehicle",
  props<{ data: { driverId: string; vehicleId: string } }>()
);

export const addDriver = createAction(
  "[Add Driver Button] Add Driver",
  props<{ data: { driverId: string } }>()
);
