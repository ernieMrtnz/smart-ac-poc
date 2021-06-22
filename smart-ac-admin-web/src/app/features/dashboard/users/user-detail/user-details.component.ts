import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

import { UserParentQuery, UserParentStore } from "../user-parent/user-parent.state";
import { UserParentService } from "../user-parent/user-parent.service";
import { NotificationService } from "@app/shared";

@Component({
  templateUrl: "./user-details.component.html",
  styleUrls: ["./user-details.component.scss"],
})
export class UserDetailsComponent {
  constructor(
    public query: UserParentQuery,
    private store: UserParentStore,
    private route: ActivatedRoute,
    private service: UserParentService,
    private notificationService: NotificationService
  ) {}

  async ngOnInit(): Promise<void> {
    let employeeId = this.route.snapshot.paramMap.get("employeeId") as unknown as number;

    try {
      this.store.setLoading(true);

      let result = await this.service.getDetails(employeeId);

      this.store.setUserDetails(result);
    } catch (err) {
      this.notificationService.exception(err);
    } finally {
      this.store.setLoading(false);
    }
  }

  ngOnDestroy(): void {
    this.store.reset();
  }

  async enableUser(): Promise<void> {
    try {
      this.store.setLoading(true);

      let id = this.query.getValue().userDetails?.id;

      let result = await this.service.enableUser(id);

      this.store.setUserDetails(result);
    } catch (error) {
      this.notificationService.exception(error);
      return new Promise(null);
    } finally {
      this.store.setLoading(false);
    }
  }

  async disableUser(): Promise<void> {
    try {
      this.store.setLoading(true);

      let id = this.query.getValue().userDetails?.id;

      let result = await this.service.disableUser(id);

      this.store.setUserDetails(result);
    } catch (error) {
      this.notificationService.exception(error);
      return new Promise(null);
    } finally {
      this.store.setLoading(false);
    }
  }
}
