import { Injectable } from "@angular/core";

import { PageResult, DeviceClient, DeviceResponseModel } from "@app/core/data-services";
import { NotificationService, PaginatorEvent } from "@app/shared";
import { DeviceListStore, DeviceListState, DeviceSearchParams } from "./devices-list.state";
import { BaseEntityService } from "../../../common/base-abstract/base-entity.service";

@Injectable()
export class DeviceListService extends BaseEntityService<DeviceListState> {
  constructor(
    private store: DeviceListStore,
    private deviceClient: DeviceClient,
    private notificationService: NotificationService
  ) {
    super(store, notificationService);
  }

  async loadPage(event: PaginatorEvent, searchParams: DeviceSearchParams): Promise<void> {
    await this.loadEntitiesWrapper(async () => {
      let page = event ? event.page : 1;
      let pageSize = event ? event.pageSize : 50;

      let dto = this.getFiltersDto(searchParams);

      this.store.setLoading(true);

      let response = (await this.deviceClient
        .devices(dto.serialNumber, dto.sortBy, dto.orderBy, page, pageSize)
        .toPromise()) as PageResult<DeviceResponseModel>;

      this.store.setPaginationResponse(response, page, pageSize);
    });
  }

  async loadRelatedData(): Promise<void> {
    await this.loadRelatedDataWrapper(async () => {
      this.store.setRelatedDataLoaded(null);
    });
  }

  onComponentDestroy(searchParams: DeviceSearchParams): void {
    this.store.setSearchParams(searchParams);
    this.store.resetOnlyEntities();
  }

  private getFiltersDto(searchParams: DeviceSearchParams): Record<string, any> {
    let dto = {
      serialNumber: searchParams.serialNumber,
      sortBy: searchParams.sortBy,
      orderBy: searchParams.orderBy,
    };

    return dto;
  }
}
