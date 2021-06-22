import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { FormBuilder } from "@angular/forms";

import { DeviceDetailService } from "../device-detail.service";
import {
  DeviceDetailsQuery,
  DeviceDetailsStore,
  SearchDeviceDetailOptionEnum,
  SearchDeviceDetailParams,
} from "../device-detail.state";
import { NotificationService } from "@app/shared";

@Component({
  templateUrl: "./device-detail-page.component.html",
})
export class DeviceDetailPageComponent {
  searchParams: FormGroupTyped<SearchDeviceDetailParams>;

  private deviceId: number;

  constructor(
    public query: DeviceDetailsQuery,
    private store: DeviceDetailsStore,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private service: DeviceDetailService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    this.deviceId = this.route.snapshot.paramMap.get("deviceId") as unknown as number;

    this.searchParams = this.fb.group({
      option: [SearchDeviceDetailOptionEnum.ThisWeek],
    }) as FormGroupTyped<SearchDeviceDetailParams>;

    await this.search();
  }

  async search(): Promise<void> {
    let formValue = this.searchParams.value;
    this.store.setLoading(true);

    try {
      await this.service.loadDetailsDataForChart(this.deviceId, formValue);
    } catch (error) {
      this.notificationService.error(error);
    } finally {
      this.store.setLoading(false);
    }
  }

  ngOnDestroy(): void {
    this.store.reset();
  }
}
