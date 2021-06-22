import { Injectable } from "@angular/core";
import { StoreConfig } from "@datorama/akita";

import {
  AppPagedEntityState,
  AppPagedEntityStore,
  AppPagedQueryEntity,
} from "@app/core/akita-extensions/app-paged-entity-state";
import { DeviceResponseModel } from "@app/core/data-services";

export enum DeviceSearchOptionEnum {
  All = "All",
  SerialNumber = "Serial Number",
}

export interface DeviceSearchParams {
  option: DeviceSearchOptionEnum;
  serialNumber: string;
  sortBy: string;
  orderBy: string;
}

export interface DeviceListState extends AppPagedEntityState<DeviceResponseModel> {
  searchParams: DeviceSearchParams;
}

@Injectable()
@StoreConfig({
  idKey: "id",
  name: "devices",
  resettable: true,
})
export class DeviceListStore extends AppPagedEntityStore<DeviceListState, DeviceResponseModel> {
  setSearchParams(searchParams: DeviceSearchParams): void {
    this.update({ searchParams });
  }

  constructor() {
    super();
  }
}

@Injectable()
export class DeviceListQuery extends AppPagedQueryEntity<DeviceListState, DeviceResponseModel> {
  constructor(protected store: DeviceListStore) {
    super(store);
  }
}
