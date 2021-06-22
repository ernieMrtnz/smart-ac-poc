import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { EmployeeResponseModel } from "@app/core/data-services";

@Component({
  selector: "app-user-list-table",
  templateUrl: "./user-list-table.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListTableComponent {
  @Input() list: EmployeeResponseModel[];

  @Output() selectEmployee = new EventEmitter<EmployeeResponseModel>();

  displayedColumns = [
    "id",
    "firstName",
    "lastName",
    "email",
    "isAdmin",
    "status",
    "selectEmployee",
  ];

  trackByID(item: EmployeeResponseModel): number {
    return item.id;
  }
}
