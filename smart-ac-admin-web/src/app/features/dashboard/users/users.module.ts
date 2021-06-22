import { NgModule } from "@angular/core";
import { AuthGuard } from "@app/core/auth";
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "@app/shared";
import { UserParentComponent } from "./user-parent/user-parent.component";
import { UserParentStore, UserParentQuery } from "./user-parent/user-parent.state";
import { UserParentService } from "./user-parent/user-parent.service";
import { UserListQuery, UserListStore } from "./user-list/user-list.state";
import { UserListService } from "./user-list/user-list.service";
import { UserListPageComponent } from "./user-list/user-list-page/user-list-page.component";
import { UserListFilterComponent } from "./user-list/user-list-filter/user-list-filter.component";
import { UserListTableComponent } from "./user-list/user-list-table/user-list-table.component";
import { UserDetailsComponent } from "./user-detail/user-details.component";

const routes: Routes = [
  {
    path: "",
    component: UserParentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "users", pathMatch: "full" },
      { path: "users", component: UserListPageComponent },
      { path: "user/:employeeId", component: UserDetailsComponent },
    ],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  providers: [
    UserListStore,
    UserListQuery,
    UserListService,
    UserParentStore,
    UserParentQuery,
    UserParentService,
  ],
  declarations: [
    UserListFilterComponent,
    UserListPageComponent,
    UserListTableComponent,
    UserParentComponent,
    UserDetailsComponent,
  ],
  exports: [UserParentComponent],
})
export class UsersModule {}
