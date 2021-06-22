import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from "@angular/core";

import { SearchDeviceDetailOptionEnum, SearchDeviceDetailParams } from "../device-detail.state";
import { enumToArray } from "@app/core/helpers";

@Component({
  selector: "app-device-detail-filter",
  templateUrl: "./device-detail-filter.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceDetailFilterComponent {
  @Input() searchParams: FormGroupTyped<SearchDeviceDetailParams>;
  @Input() loading: boolean;

  @Output() search = new EventEmitter<void>();

  options = enumToArray<string>(SearchDeviceDetailOptionEnum);
}
