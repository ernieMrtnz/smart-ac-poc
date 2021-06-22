import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { DeviceResponseModel } from "@app/core/data-services";

@Component({
  selector: "app-device-list-table",
  templateUrl: "./devices-list-table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DeviceListTableComponent {
  @Input() list: DeviceResponseModel[];

  @Output() selectDevice = new EventEmitter<DeviceResponseModel>();

  displayedColumns = ["id", "serialNumber", "firmwareVersion", "statusId", "selectDevice"];

  trackByID(item: DeviceResponseModel): number {
    return item.id;
  }
}
