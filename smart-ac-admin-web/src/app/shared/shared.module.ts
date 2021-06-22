import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LayoutModule } from "@angular/cdk/layout";
import { ReactiveFormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatDialogModule } from "@angular/material/dialog";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { MatMenuModule } from "@angular/material/menu";
import { MatListModule } from "@angular/material/list";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatRadioModule } from "@angular/material/radio";
import { MatSelectModule } from "@angular/material/select";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatSortModule } from "@angular/material/sort";
import { MatTableModule } from "@angular/material/table";
import { MatTabsModule } from "@angular/material/tabs";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDividerModule } from "@angular/material/divider";
import { MatBadgeModule } from "@angular/material/badge";

import { DirectivesModule } from "./directives";
import { IconModule } from "./icons/icon.module";
import { LoadingBarModule } from "./loading-bar/loading-bar.module";
import { LoadingButtonModule } from "./loading-button/loading-button.module";
import { LoadingOverlayModule } from "./loading-overlay/loading-overlay.module";
import { AppInputErrorModule } from "./input-error/input-error.module";
import { NoDataFoundModule } from "./no-data-found/no-data-found.module";
import { PageHeaderModule } from "./page-header/page-header.module";
import { PagePreviousModule } from "./page-previous/page-previous.module";
import { PaginatorModule } from "./paginator/paginator.module";
import { PipesModule } from "./pipes";
import { AppChartModule } from "./charts/chart.module";

export * from "./helpers";

let modules = [
  // angular
  CommonModule,
  ReactiveFormsModule,

  // material
  LayoutModule,
  MatButtonModule,
  MatCardModule,
  MatDialogModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatDividerModule,
  MatBadgeModule,

  // app
  DirectivesModule,
  IconModule,
  LoadingBarModule,
  LoadingButtonModule,
  LoadingOverlayModule,
  AppInputErrorModule,
  NoDataFoundModule,
  PageHeaderModule,
  PagePreviousModule,
  PaginatorModule,
  PipesModule,
  AppChartModule,
];

@NgModule({
  imports: modules,
  exports: modules,
})
export class SharedModule {}
