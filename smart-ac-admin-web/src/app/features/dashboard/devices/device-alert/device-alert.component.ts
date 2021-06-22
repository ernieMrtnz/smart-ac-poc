import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { DeviceAlertService } from "./device-alert.service";
import { NotificationService } from "@app/shared";
import { DeviceDetailResponseModel } from "@app/core/data-services";

@Component({
  templateUrl: "./device-alert.component.html",
})
export class DeviceAlertComponent {
  deviceDetails: DeviceDetailResponseModel;
  deviceDetailId: number;
  resolved = false;

  constructor(
    private deviceAlertService: DeviceAlertService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadNotificationForDevice();
  }

  async resolve(): Promise<void> {
    let result = await this.deviceAlertService.updateDetails(this.deviceDetailId);

    if (result) {
      this.resolved = result;
    } else {
      // issue happened trying to save
      this.notificationService.error(
        "Sorry, an issue has occurred trying to update device detail."
      );
    }
  }

  private async loadNotificationForDevice(): Promise<void> {
    this.deviceDetailId = this.route.snapshot.paramMap.get("detailsId") as unknown as number;

    try {
      this.deviceDetails = await this.deviceAlertService.getDetails(this.deviceDetailId);
      this.resolved = this.deviceDetails.healthStatus === "ok";
    } catch (error) {
      this.notificationService.exception(error);
    }
  }
}
