import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { DeviceSearchParams, DeviceSearchOptionEnum } from "./../devices-list.state";
import { enumToArray } from "@app/core/helpers";

@Component({
  selector: "app-device-list-filter",
  templateUrl: "./devices-list-filter.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceListFilterComponent {
  @Input() searchParams: FormGroupTyped<DeviceSearchParams>;
  @Input() loading: boolean;

  @Output() search = new EventEmitter<void>();

  options = enumToArray(DeviceSearchOptionEnum);
  optionEnum = DeviceSearchOptionEnum;
}
