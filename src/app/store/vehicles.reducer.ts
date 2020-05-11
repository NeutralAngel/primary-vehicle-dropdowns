import { Action, createReducer, on } from "@ngrx/store";
import { EntityState, EntityAdapter, createEntityAdapter } from "@ngrx/entity";

import * as vehiclesActions from "./vehicles.actions";

export const VEHICLES = [{ id: "1", description: "vehicle1" }];

export interface Vehicle {
  id: string;
  description: string;
}

export interface State extends EntityState<Vehicle> {}

export const adapter: EntityAdapter<Vehicle> = createEntityAdapter<Vehicle>({});

export const initialState: State = adapter.getInitialState({});

const vehicleReducer = createReducer(
  initialState,
  on(vehiclesActions.appLoaded, state => {
    return adapter.setAll(VEHICLES, state);
  }),
  on(vehiclesActions.addVehicle, (state, action) => {
    return adapter.addOne(
      {
        id: action.data.vehicleId,
        description: "vehicle" + action.data.vehicleId
      },
      state
    );
  })
);

export function reducer(state: State | undefined, action: Action) {
  return vehicleReducer(state, action);
}
