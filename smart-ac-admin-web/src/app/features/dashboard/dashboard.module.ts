import { NgModule } from "@angular/core";

import { SharedModule } from "@app/shared";
import { LandingModule } from "./landing/landing.module";
import { LandingComponent } from "./landing/landing.component";
import { UsersModule } from "./users/users.module";
import { DevicesModule } from "./devices/devices.module";

@NgModule({
  imports: [SharedModule, LandingModule, UsersModule, DevicesModule],
  declarations: [LandingComponent],
  exports: [LandingModule, UsersModule, DevicesModule],
})
export class DashboardModule {}
