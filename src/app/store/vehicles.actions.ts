import { createAction, props } from "@ngrx/store";

export const appLoaded = createAction("[Application] Loaded");

export const addVehicle = createAction(
  "[Add Vehicle Button] Add Vehicle",
  props<{ data: { vehicleId: string } }>()
);
