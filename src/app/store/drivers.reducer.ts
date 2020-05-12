import { Action, createReducer, on } from "@ngrx/store";
import {
  EntityState,
  EntityAdapter,
  createEntityAdapter,
  Update
} from "@ngrx/entity";

import * as vehiclesActions from "./vehicles.actions";
import * as driversActions from "./drivers.actions";
import update = require("lodash/update");

export const DRIVERS: Driver[] = [
  {
    id: "1",
    name: "driver1",
    primary: "",
    vehicleAssociations: [
      // {
      //   vehicleId: 1,
      //   associationTypeCode: "PR"
      // },
      {
        vehicleId: "2",
        associationTypeCode: "OC"
      }
    ]
  },
  {
    id: "2",
    name: "driver2",
    primary: "",
    vehicleAssociations: [
      // {
      //   vehicleId: 1,
      //   associationTypeCode: "PR"
      // },
      {
        vehicleId: "2",
        associationTypeCode: "OC"
      }
    ]
  }
];

export interface Driver {
  id: string;
  name: string;
  primary: string;
  vehicleAssociations: VehicleAssociation[];
}

export interface VehicleAssociation {
  vehicleId: string;
  associationTypeCode: string;
}

// "vehicleAssociations": [
//             {
//                 "vehicleId": 1,
//                 "associationTypeCode": "PR"
//             },
//             {
//                 "vehicleId": 2,
//                 "associationTypeCode": "OC"
//             }
//         ],

export interface State extends EntityState<Driver> {}

export const adapter: EntityAdapter<Driver> = createEntityAdapter<Driver>({});

export const initialState: State = adapter.getInitialState({});

const driversReducer = createReducer(
  initialState,
  on(vehiclesActions.appLoaded, state => {
    return adapter.setAll(DRIVERS, state);
  }),
  on(driversActions.updatePrimaryVehicle, (state, action) => {
    let vehicleAssociations = action.data.vehicleAssociations;
    let updates: Update<Driver>[] = [
      {
        id: action.data.driverId,
        changes: {
          vehicleAssociations
        }
      }
    ];
    updates = updates.concat(
      (state.ids as string[])
        .filter(id => id > action.data.driverId)
        .map(id => {
          return {
            id,
            changes: {
              primary: "",
              vehicleAssociations: [
                ...state.entities[id].vehicleAssociations.filter(
                  va => va.associationTypeCode !== "PR"
                )
              ]
            }
          };
        })
    );
    return adapter.updateMany(updates, state);
  }),
  on(driversActions.addDriver, (state, action) => {
    return adapter.addOne(
      {
        id: action.data.driverId,
        name: "driver" + action.data.driverId,
        primary: "",
        vehicleAssociations: []
      },
      state
    );
  }),
  on(vehiclesActions.addVehicle, (state, action) => {
    let updates = (state.ids as string[])
      .filter(id => id > "1")
      .map(id => {
        return {
          id,
          changes: { primary: "" }
        };
      });
    return adapter.updateMany(updates, state);
  })
);

export function reducer(state: State | undefined, action: Action) {
  return driversReducer(state, action);
}
