import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder } from "@angular/forms";
import { Sort } from "@angular/material/sort";

import { OrderByEnum } from "@app/core";
import { EmployeeResponseModel } from "@app/core/data-services";
import { PaginatorEvent } from "@app/shared";
import { UserListService } from "../user-list.service";
import { UserListQuery, UserListState, UserListSearchParams } from "../user-list.state";
import { BaseEntityComponent } from "../../../../common/base-abstract/base.component";

@Component({
  templateUrl: "./user-list-page.component.html",
})
export class UserListPageComponent extends BaseEntityComponent<UserListState> {
  searchParams: FormGroupTyped<UserListSearchParams>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public query: UserListQuery,
    private service: UserListService
  ) {
    super(service);
  }

  async ngOnInit(): Promise<void> {
    this.searchParams = this.fb.group({
      sortBy: ["lastName"],
      orderBy: [OrderByEnum.Desc],
    }) as FormGroupTyped<UserListSearchParams>;

    await this.service.loadRelatedData();

    let previousSearchParams = this.query.getValue().searchParams;

    if (previousSearchParams) {
      this.searchParams.patchValue(previousSearchParams);

      this.searchParams.valid && (await this.search(null));
    }
  }

  async search(event: PaginatorEvent): Promise<void> {
    await this.service.loadPage(event, this.searchParams.value);
  }

  async sortData(event: Sort): Promise<void> {
    this.searchParams.patchValue({
      sortBy: event.active,
      orderBy: event.direction,
    });

    await this.search(null);
  }

  async goToDetails(employee: EmployeeResponseModel): Promise<void> {
    await this.router.navigateByUrl(`user/${employee.id}`);
  }

  ngOnDestroy(): void {
    this.searchParams && this.service.onComponentDestroy(this.searchParams.value);
  }
}
