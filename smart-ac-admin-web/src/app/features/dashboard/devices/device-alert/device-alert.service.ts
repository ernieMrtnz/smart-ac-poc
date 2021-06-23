import { Injectable } from "@angular/core";

import { DeviceDetailClient } from "@app/core/data-services";
import { DeviceDetailsStore } from "../device-detail/device-detail.state";

@Injectable({
  providedIn: "root",
})
export class DeviceAlertService {
  constructor(private store: DeviceDetailsStore, private deviceDetailClient: DeviceDetailClient) {}

  async getDetails(id: number): Promise<void> {
    let result = await this.deviceDetailClient.deviceDetailsGet(id).toPromise();
    this.store.setCurrentDeviceDetails(result);
  }

  async updateDetails(id: number): Promise<void> {
    let result = await this.deviceDetailClient.resolve(id).toPromise();
    this.store.setCurrentDeviceDetails(result);
  }
}
