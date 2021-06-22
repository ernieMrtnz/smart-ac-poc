import { CommonModule } from "@angular/common";
import { NgModule, Optional, SkipSelf } from "@angular/core";

import { DeviceStatusHub } from "./device-status/device-status.hub";

@NgModule({
  imports: [CommonModule],
  providers: [DeviceStatusHub],
})
export class HubsModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: HubsModule
  ) {
    if (parentModule) {
      throw new Error("HubsModule is already loaded. Import only in AppModule");
    }
  }
}
