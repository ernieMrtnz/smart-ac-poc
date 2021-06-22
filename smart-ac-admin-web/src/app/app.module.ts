import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CoreModule } from "@app/core";
import { SharedModule } from "@app/shared";
import { environment } from "@env";

import { LayoutModule } from "./features/layout/layout.module";
import { LoginModule } from "./features/login/login.module";
import { DashboardModule } from "./features/dashboard/dashboard.module";
import { HubsModule } from "./features/common/hubs";

import { API_BASE_URL } from "./core/data-services";

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // core, shared
    CoreModule,
    SharedModule,
    HubsModule,

    // sections
    LayoutModule,
    LoginModule,
    DashboardModule,

    // app
    AppRoutingModule,
  ],
  providers: [{ provide: API_BASE_URL, useValue: environment.apiUrl }],
  bootstrap: [AppComponent],
})
export class AppModule {}
