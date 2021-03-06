import { Injectable } from "@angular/core";

import { DeviceDetailClient } from "@app/core/data-services";
import {
  DeviceDetailsStore,
  SearchDeviceDetailOptionEnum,
  SearchDeviceDetailParams,
} from "./device-detail.state";

@Injectable()
export class DeviceDetailService {
  constructor(
    private deviceDetailsStore: DeviceDetailsStore,
    private deviceDetailClient: DeviceDetailClient
  ) {}

  setSearchParams(searchParams: SearchDeviceDetailParams): void {
    this.deviceDetailsStore.setSearchParams(searchParams);
  }

  async loadDetailsDataForChart(
    deviceId: number,
    searchParams: SearchDeviceDetailParams
  ): Promise<void> {
    let dto = this.getFilterDto(searchParams);
    let result = await this.deviceDetailClient
      .forChart(deviceId, dto.isToday, dto.isWeek, dto.isMonth, dto.isYear)
      .toPromise();

    this.deviceDetailsStore.setCurrentDeviceDetailsForChart(result);
  }

  getFilterDto(searchParams: SearchDeviceDetailParams): Record<string, any> {
    return {
      isToday: searchParams.option === SearchDeviceDetailOptionEnum.Today,
      isWeek: searchParams.option === SearchDeviceDetailOptionEnum.ThisWeek,
      isMonth: searchParams.option === SearchDeviceDetailOptionEnum.ThisMonth,
      isYear: searchParams.option === SearchDeviceDetailOptionEnum.ThisYear,
    };
  }
}
