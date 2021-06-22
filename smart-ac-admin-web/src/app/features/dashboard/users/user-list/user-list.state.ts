import { Injectable } from "@angular/core";
import { StoreConfig } from "@datorama/akita";

import {
  AppPagedEntityState,
  AppPagedEntityStore,
  AppPagedQueryEntity,
} from "@app/core/akita-extensions/app-paged-entity-state";
import { EmployeeResponseModel } from "@app/core/data-services";

export interface UserListSearchParams {
  sortBy: string;
  orderBy: string;
}

export interface UserListState extends AppPagedEntityState<EmployeeResponseModel> {
  searchParams: UserListSearchParams;
}

@Injectable()
@StoreConfig({
  idKey: "id",
  name: "employees",
  resettable: true,
})
export class UserListStore extends AppPagedEntityStore<UserListState, EmployeeResponseModel> {
  setSearchParams(searchParams: UserListSearchParams): void {
    this.update({ searchParams });
  }

  // TODO: need to add related data here when going to update
  // setRelatedDataLoaded(): void {}

  constructor() {
    super();
  }
}

@Injectable()
export class UserListQuery extends AppPagedQueryEntity<UserListState, EmployeeResponseModel> {
  constructor(protected store: UserListStore) {
    super(store);
  }
}
