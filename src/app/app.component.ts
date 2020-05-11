import { Component } from "@angular/core";
import { Store, select } from "@ngrx/store";
import * as vehicleActions from "./store/vehicles.actions";
import * as vehiclesSelectors from "./store/vehicles.selectors";
import * as driversSelectors from "./store/drivers.selectors";
import * as driverActions from "./store/drivers.actions";
import * as combinedSelectors from "./store/combined.selectors";
import { tap } from "rxjs/operators";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  vehicles$;
  drivers$;
  dropdowns$;

  constructor(private store: Store) {
    store.dispatch(vehicleActions.appLoaded());
  }

  ngOnInit() {
    this.vehicles$ = this.store.pipe(
      select(vehiclesSelectors.selectAllVehicles)
    );
    this.drivers$ = this.store.pipe(
      select(driversSelectors.selectAllDrivers),
      tap(v => console.log("drivers", v))
    );
    this.dropdowns$ = this.store.pipe(
      select(combinedSelectors.selectPrimaryVehicleDropdowns)
    );
  }

  _updatePrimaryVehicle(primaryVehicleUpdate) {
    this.store.dispatch(
      driverActions.updatePrimaryVehicle({ data: primaryVehicleUpdate })
    );
  }

  addDriver(id: string): void {
    this.store.dispatch(driverActions.addDriver({ data: { driverId: id } }));
  }

  addVehicle(id: string): void {
    this.store.dispatch(vehicleActions.addVehicle({ data: { vehicleId: id } }));
  }
}
