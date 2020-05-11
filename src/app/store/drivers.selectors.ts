import { createFeatureSelector, createSelector } from "@ngrx/store";
import * as fromDrivers from "./drivers.reducer";

export const selectDriversState = createFeatureSelector<fromDrivers.State>(
  "drivers"
);
export const {
  selectIds,
  selectEntities,
  selectAll,
  selectTotal
} = fromDrivers.adapter.getSelectors();

export const selectAllDriverEntities = createSelector(
  selectDriversState,
  selectEntities
);

export const _selectAllDrivers = createSelector(
  selectDriversState,
  selectAll
);

export const selectAllDrivers = createSelector(
  _selectAllDrivers,
  drivers => drivers
);
