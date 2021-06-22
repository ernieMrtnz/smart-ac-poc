import { Injectable } from "@angular/core";
import { StoreConfig } from "@datorama/akita";

import { AppEntityState, AppEntityStore, AppQueryEntity } from "@app/core/akita-extensions";
import { EmployeeResponseModel } from "@app/core/data-services";

export interface UserSearchParams {
  sortBy: string;
  orderBy: string;
}

export interface UserParentState extends AppEntityState<EmployeeResponseModel> {
  userDetails: EmployeeResponseModel;
}

@Injectable()
@StoreConfig({
  name: "employee-details",
  resettable: true,
})
export class UserParentStore extends AppEntityStore<UserParentState> {
  setUserDetails(empl: EmployeeResponseModel): void {
    this.update({ userDetails: empl });
  }

  constructor() {
    super();
  }
}

@Injectable()
export class UserParentQuery extends AppQueryEntity<UserParentState> {
  userDetails$ = this.select((x) => x.userDetails);

  constructor(protected store: UserParentStore) {
    super(store);
  }
}
