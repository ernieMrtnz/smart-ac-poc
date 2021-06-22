import { NgModule } from "@angular/core";
import { SharedModule } from "@app/shared";
import { LoginComponent } from "./login.component";
import { AuthGuard } from "@app/core/auth";
import { Routes, RouterModule } from "@angular/router";

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent,
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  declarations: [LoginComponent],
})
export class LoginModule {}
