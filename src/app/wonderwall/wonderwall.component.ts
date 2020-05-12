import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from "@angular/core";
import { Driver } from "../store/drivers.reducer";

@Component({
  selector: "app-wonderwall",
  templateUrl: "./wonderwall.component.html",
  styleUrls: ["./wonderwall.component.css"],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WonderwallComponent implements OnInit {
  @Input() drivers = [];
  @Input() dropdowns = [];
  @Input() vehicles = [];
  @Output() updatePrimaryVehicle = new EventEmitter<{
    driverId: string;
    vehicleAssociations: any;
  }>();
  @Output() addDriver = new EventEmitter<string>();
  @Output() addVehicle = new EventEmitter<string>();

  mydropdown = [{ id: "1", description: "vehicle1" }];

  constructor() {}

  ngOnInit() {}

  _updatePrimaryVehicle(driver: Driver, vehicleId: string) {
    const vehicleAssociations = [
      ...driver.vehicleAssociations.filter(
        va => va.associationTypeCode != "PR"
      ),
      { vehicleId, associationTypeCode: "PR" }
    ];

    this.updatePrimaryVehicle.emit({
      driverId: driver.id,
      vehicleAssociations
    });
  }

  _addDriver(): void {
    this.addDriver.emit(this.drivers.length + 1 + "");
  }

  _addVehicle(): void {
    this.addVehicle.emit(this.vehicles.length + 1 + "");
  }
}
