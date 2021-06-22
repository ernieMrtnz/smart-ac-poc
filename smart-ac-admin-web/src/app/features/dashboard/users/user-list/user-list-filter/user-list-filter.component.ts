import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";

import { UserListSearchParams } from "../user-list.state";

@Component({
  selector: "app-user-list-filter",
  templateUrl: "./user-list-filter.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UserListFilterComponent {
  @Input() searchParams: FormGroupTyped<UserListSearchParams>;
  @Input() loading: boolean;

  @Output() search = new EventEmitter<void>();
}
