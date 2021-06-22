import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { FormBuilder, ValidatorFn } from "@angular/forms";
import { Sort } from "@angular/material/sort";

import { OrderByEnum, CustomValidators } from "@app/core";
import { DeviceResponseModel } from "@app/core/data-services";
import { PaginatorEvent } from "@app/shared";
import { DeviceListService } from "../devices-list.service";
import {
  DeviceListQuery,
  DeviceListState,
  DeviceSearchParams,
  DeviceSearchOptionEnum,
} from "../devices-list.state";
import { BaseEntityComponent } from "../../../../common/base-abstract/base.component";

@Component({
  templateUrl: "./devices-list-page.component.html",
})
export class DeviceListPageComponent extends BaseEntityComponent<DeviceListState> {
  searchParams: FormGroupTyped<DeviceSearchParams>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public query: DeviceListQuery,
    private service: DeviceListService
  ) {
    super(service);
  }

  async ngOnInit(): Promise<void> {
    let getValidator = this.getValidator;

    this.searchParams = this.fb.group({
      option: [DeviceSearchOptionEnum.All],
      serialNumber: [null, getValidator(DeviceSearchOptionEnum.SerialNumber)],
      sortBy: ["id"],
      orderBy: [OrderByEnum.Desc],
    }) as FormGroupTyped<DeviceSearchParams>;

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

  async goToDetails(device: DeviceResponseModel): Promise<void> {
    await this.router.navigateByUrl(`devices/${device.id}`);
  }

  ngOnDestroy(): void {
    this.searchParams && this.service.onComponentDestroy(this.searchParams.value);
  }

  private getValidator(requiredOption: DeviceSearchOptionEnum): ValidatorFn {
    return CustomValidators.requiredIf("option", (option) => option == requiredOption);
  }
}
