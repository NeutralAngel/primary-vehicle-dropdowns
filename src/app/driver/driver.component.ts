import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  tap,
  distinctUntilChanged,
  startWith,
  filter,
  skip
} from "rxjs/operators";
import { Driver } from "../store/drivers.reducer";

@Component({
  selector: "app-driver",
  templateUrl: "./driver.component.html",
  styleUrls: ["./driver.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverComponent implements OnInit {
  @Input() driver: Driver;
  @Input() primaryVehicleDropdown = [];
  @Output() updatePrimaryVehicle = new EventEmitter<any>();

  primaryVehicle = new FormControl({ value: "", disabled: true });

  constructor() {}

  ngOnInit() {
    this.primaryVehicle.valueChanges
      .pipe(tap(v => this.updatePrimaryVehicle.emit(v)))
      .subscribe();
  }

  ngOnChanges() {
    let primaryVehicle = this.driver.vehicleAssociations.find(
      va => va.associationTypeCode === "PR"
    );

    this.primaryVehicle.setValue(
      primaryVehicle ? primaryVehicle.vehicleId : "",
      { emitEvent: false }
    );

    if (this.primaryVehicleDropdown.length !== 0) {
      this.primaryVehicle.enable({ emitEvent: false });
    } else {
      this.primaryVehicle.disable({ emitEvent: false });
    }

    if (
      this.driver.primary === "" &&
      this.primaryVehicleDropdown.length === 1
    ) {
      setTimeout(() =>
        this.updatePrimaryVehicle.emit(this.primaryVehicleDropdown[0].id)
      );
    }
  }

  ngOnDestroy() {}
}
