import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromVehicles from "./vehicles.reducer";

export const selectVehiclesState = createFeatureSelector<fromVehicles.State>(
  "vehicles"
);
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = fromVehicles.adapter.getSelectors();

export const selectAllVehicleEntities = createSelector(
  selectVehiclesState,
  selectEntities
);

export const _selectAllVehicles = createSelector(
  selectVehiclesState,
  selectAll
);

export const selectAllVehicles = createSelector(
  _selectAllVehicles,
  vehicles => vehicles
);
