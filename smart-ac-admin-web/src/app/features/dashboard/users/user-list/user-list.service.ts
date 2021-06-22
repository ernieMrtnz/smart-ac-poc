import { Injectable } from "@angular/core";

import { PageResult, EmployeeClient, EmployeeResponseModel } from "@app/core/data-services";
import { NotificationService, PaginatorEvent } from "@app/shared";
import { UserListStore, UserListState, UserListSearchParams } from "./user-list.state";
import { BaseEntityService } from "../../../common/base-abstract/base-entity.service";

@Injectable()
export class UserListService extends BaseEntityService<UserListState> {
  constructor(
    private store: UserListStore,
    private employeeClient: EmployeeClient,
    private notificationService: NotificationService
  ) {
    super(store, notificationService);
  }

  async loadPage(event: PaginatorEvent, searchParams: UserListSearchParams): Promise<void> {
    await this.loadEntitiesWrapper(async () => {
      let page = event ? event.page : 1;
      let pageSize = event ? event.pageSize : 50;

      let dto = this.getFiltersDto(searchParams);

      this.store.setLoading(true);

      let response = (await this.employeeClient
        .forPaged(dto.sortBy, dto.orderBy, page, pageSize)
        .toPromise()) as PageResult<EmployeeResponseModel>;

      this.store.setPaginationResponse(response, page, pageSize);
    });
  }

  async loadRelatedData(): Promise<void> {
    await this.loadRelatedDataWrapper(async () => {
      this.store.setRelatedDataLoaded(null);
    });
  }

  onComponentDestroy(searchParams: UserListSearchParams): void {
    this.store.setSearchParams(searchParams);
    this.store.resetOnlyEntities();
  }

  private getFiltersDto(searchParams: UserListSearchParams): Record<string, any> {
    let dto = {
      sortBy: searchParams.sortBy,
      orderBy: searchParams.orderBy,
    };

    return dto;
  }
}
