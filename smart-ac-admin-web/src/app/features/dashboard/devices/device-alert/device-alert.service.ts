import { Injectable } from "@angular/core";

import { DeviceDetailClient, DeviceDetailResponseModel } from "@app/core/data-services";

@Injectable({
  providedIn: "root",
})
export class DeviceAlertService {
  constructor(private deviceDetailClient: DeviceDetailClient) {}

  async getDetails(id: number): Promise<DeviceDetailResponseModel> {
    return await this.deviceDetailClient.deviceDetail(id).toPromise();
  }

  async updateDetails(id: number): Promise<boolean> {
    return await this.deviceDetailClient.resolve(id).toPromise();
  }
}
