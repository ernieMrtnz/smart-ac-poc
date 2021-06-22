import { Component } from "@angular/core";

import { UserParentStore } from "./user-parent.state";

@Component({
  templateUrl: "./user-parent.component.html",
})
export class UserParentComponent {
  constructor(private store: UserParentStore) {}

  ngOnDestroy(): void {
    this.store.reset();
  }
}
