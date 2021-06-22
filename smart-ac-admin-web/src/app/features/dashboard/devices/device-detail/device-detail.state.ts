import { Injectable } from "@angular/core";
import { StoreConfig } from "@datorama/akita";

import {
  AppEntityState,
  AppEntityStore,
  AppQueryEntity,
} from "@app/core/akita-extensions/app-entity-state";
import { DeviceDetailResponseModel, DeviceDetailsForChartResponse } from "@app/core/data-services";

export enum SearchDeviceDetailOptionEnum {
  Today = "Today",
  ThisWeek = "This Week",
  ThisMonth = "This Month",
  ThisYear = "This Year",
}

export interface SearchDeviceDetailParams {
  option: SearchDeviceDetailOptionEnum;
}

export interface DeviceDetailsState extends AppEntityState<DeviceDetailResponseModel> {
  searchParams: SearchDeviceDetailParams;
  currentDeviceDetails: DeviceDetailResponseModel;
  deviceDetailChartResponse: DeviceDetailsForChartResponse;
}

@Injectable()
@StoreConfig({
  name: "device-details",
  resettable: true,
})
export class DeviceDetailsStore extends AppEntityStore<
  DeviceDetailsState,
  DeviceDetailResponseModel
> {
  setSearchParams(searchParams: SearchDeviceDetailParams): void {
    this.update({ searchParams });
  }

  setCurrentDeviceDetails(currentDeviceDetails: DeviceDetailResponseModel): void {
    this.update({ currentDeviceDetails });
  }

  setCurrentDeviceDetailsForChart(deviceDetailChartResponse: DeviceDetailsForChartResponse): void {
    this.update({ deviceDetailChartResponse });
  }

  constructor() {
    super();
  }
}

@Injectable()
export class DeviceDetailsQuery extends AppQueryEntity<
  DeviceDetailsState,
  DeviceDetailResponseModel
> {
  deviceDetailsForChart$ = this.select((c) => c.deviceDetailChartResponse);
  currentDeviceDetails$ = this.select((d) => d.currentDeviceDetails);

  constructor(protected store: DeviceDetailsStore) {
    super(store);
  }
}
