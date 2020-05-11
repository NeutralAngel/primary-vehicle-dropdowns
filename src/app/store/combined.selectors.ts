import { createSelector } from "@ngrx/store";
import { Vehicle } from "./vehicles.reducer";
import { Driver } from "./drivers.reducer";
import * as fromDrivers from "./drivers.selectors";
import * as fromVehicles from "./vehicles.selectors";

export const selectPrimaryVehicleDropdowns = createSelector(
  fromDrivers.selectAllDrivers,
  fromVehicles.selectAllVehicles,
  (drivers, vehicles) => {
    const dropdowns: Vehicle[][] = [];
    const excessDriversCount = drivers.length - vehicles.length;
    const excessDrivers = excessDriversCount > 0;
    const vehicleSelections: { [key: string]: boolean } = {};
    let duplicateVehicleCount = 0;
    let previousDriver: Driver;
    let indexWhen: number;
    let excessDriversLeft = true;

    const chosen = (driver, vehicle) =>
      drivers.filter(d => d.id < driver.id).some(d => d.primary === vehicle.id);

    drivers.forEach((driver, index) => {
      if (previousDriver && previousDriver.primary === "") {
        dropdowns.push([]);
        return;
      }
      previousDriver = driver;

      if (excessDrivers) {
        if (vehicleSelections[driver.primary]) {
          duplicateVehicleCount += 1;
        } else {
          vehicleSelections[driver.primary] = true;
        }

        if (duplicateVehicleCount >= excessDriversCount) {
          indexWhen = indexWhen || index;
          excessDriversLeft = index <= indexWhen;
        }

        if (excessDriversLeft) {
          dropdowns.push(vehicles);
          return;
        }
      }

      dropdowns.push(vehicles.filter(vehicle => !chosen(driver, vehicle)));
    });

    return dropdowns;
  }
);
