import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "@app/shared";
import { AuthGuard } from "@app/core/auth";
import { LandingComponent } from "./landing.component";

const routes: Routes = [
  {
    path: "dashboard",
    component: LandingComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [SharedModule, RouterModule.forChild(routes)],
  exports: [],
})
export class LandingModule {}
