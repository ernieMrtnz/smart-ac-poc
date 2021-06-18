import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { CoreModule } from "@app/core";
import { SharedModule } from "@app/shared";

@NgModule({
  declarations: [AppComponent],
  imports: [
    // angular
    BrowserModule,
    BrowserAnimationsModule,

    // core, shared
    CoreModule,
    SharedModule,

    // components

    // app
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
