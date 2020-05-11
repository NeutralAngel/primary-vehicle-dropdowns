import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy
} from "@angular/core";

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
    vehicleId: string;
  }>();
  @Output() addDriver = new EventEmitter<string>();
  @Output() addVehicle = new EventEmitter<string>();

  mydropdown = [{ id: "1", description: "vehicle1" }];

  constructor() {}

  ngOnInit() {}

  _updatePrimaryVehicle(driverId: string, vehicleId: string) {
    this.updatePrimaryVehicle.emit({ driverId, vehicleId });
  }

  _addDriver(): void {
    this.addDriver.emit(this.drivers.length + 1 + "");
  }

  _addVehicle(): void {
    this.addVehicle.emit(this.vehicles.length + 1 + "");
  }
}
