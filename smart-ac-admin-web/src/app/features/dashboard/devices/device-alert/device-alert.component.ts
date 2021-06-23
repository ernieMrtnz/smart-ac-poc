import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { DeviceAlertService } from "./device-alert.service";
import { NotificationService } from "@app/shared";
import { DeviceDetailsQuery, DeviceDetailsStore } from "../device-detail/device-detail.state";

@Component({
  templateUrl: "./device-alert.component.html",
})
export class DeviceAlertComponent {
  deviceDetailId: number;

  constructor(
    public query: DeviceDetailsQuery,
    private store: DeviceDetailsStore,
    private deviceAlertService: DeviceAlertService,
    private route: ActivatedRoute,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadNotificationForDevice();
  }

  async resolve(): Promise<void> {
    this.store.setLoading(true);

    try {
      await this.deviceAlertService.updateDetails(this.deviceDetailId);
    } catch (error) {
      this.notificationService.error(error);
    } finally {
      this.store.setLoading(false);
    }
  }

  private async loadNotificationForDevice(): Promise<void> {
    this.deviceDetailId = this.route.snapshot.paramMap.get("detailsId") as unknown as number;

    this.store.setLoading(true);

    try {
      await this.deviceAlertService.getDetails(this.deviceDetailId);
    } catch (error) {
      this.notificationService.exception(error);
    } finally {
      this.store.setLoading(false);
    }
  }
}
