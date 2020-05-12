import { createAction, props } from "@ngrx/store";
import { VehicleAssociation } from "./drivers.reducer";

export const updatePrimaryVehicle = createAction(
  "[Driver Component] Update Primary Vehicle",
  props<{
    data: { driverId: string; vehicleAssociations: VehicleAssociation[] };
  }>()
);

export const addDriver = createAction(
  "[Add Driver Button] Add Driver",
  props<{ data: { driverId: string } }>()
);
