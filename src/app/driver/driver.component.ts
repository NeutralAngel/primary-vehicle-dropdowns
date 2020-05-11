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

@Component({
  selector: "app-driver",
  templateUrl: "./driver.component.html",
  styleUrls: ["./driver.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DriverComponent implements OnInit {
  @Input() driver;
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
    this.primaryVehicle.setValue(this.driver.primary, { emitEvent: false });

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
