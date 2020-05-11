import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { StoreModule, ActionReducer, MetaReducer } from "@ngrx/store";
import * as fromVehicles from "./store/vehicles.reducer";
import * as fromDrivers from "./store/drivers.reducer";
import { WonderwallComponent } from "./wonderwall/wonderwall.component";
import { DriverComponent } from "./driver/driver.component";

export function debug(reducer: ActionReducer<any>): ActionReducer<any> {
  return function(state, action) {
    // console.log("state", JSON.stringify(state, null, 2));
    console.log("action", action);
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [debug];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({}, { metaReducers }),
    StoreModule.forFeature("vehicles", fromVehicles.reducer),
    StoreModule.forFeature("drivers", fromDrivers.reducer)
  ],
  declarations: [
    AppComponent,
    HelloComponent,
    WonderwallComponent,
    DriverComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
