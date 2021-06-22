import { NgModule } from "@angular/core";
import { AuthGuard } from "@app/core/auth";
import { Routes, RouterModule } from "@angular/router";

import { SharedModule } from "@app/shared";
import { DeviceParentComponent } from "./device-parent/device-parent.component";
import { DeviceListStore, DeviceListQuery } from "./devices-list/devices-list.state";
import { DeviceListService } from "./devices-list/devices-list.service";
import { DeviceListPageComponent } from "./devices-list/devices-list-page/devices-list-page.component";
import { DeviceListFilterComponent } from "./devices-list/devices-list-filter/devices-list-filter.component";
import { DeviceListTableComponent } from "./devices-list/devices-list-table/devices-list-table.component";
import { DeviceDetailFilterComponent } from "./device-detail/device-detail-filter/device-detail-filter.component";
import { DeviceDetailPageComponent } from "./device-detail/device-detail-page/device-detail-page.component";
import { DeviceDetailBarChartComponent } from "./device-detail/device-detail-bar-chart/device-detail-bar-chart.component";
import { DeviceDetailService } from "./device-detail/device-detail.service";
import { DeviceDetailsQuery, DeviceDetailsStore } from "./device-detail/device-detail.state";
import { DeviceAlertComponent } from "./device-alert/device-alert.component";

const routes: Routes = [
  {
    path: "",
    component: DeviceParentComponent,
    canActivate: [AuthGuard],
    children: [
      { path: "", redirectTo: "devices", pathMatch: "full" },
      { path: "devices", component: DeviceListPageComponent },
      { path: "devices/:deviceId", component: DeviceDetailPageComponent },
      { path: "devices/:deviceId/details/:detailsId", component: DeviceAlertComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  providers: [
    DeviceListStore,
    DeviceListQuery,
    DeviceListService,
    DeviceDetailService,
    DeviceDetailsStore,
    DeviceDetailsQuery,
  ],
  declarations: [
    DeviceParentComponent,
    DeviceListPageComponent,
    DeviceListTableComponent,
    DeviceListFilterComponent,
    DeviceDetailPageComponent,
    DeviceDetailFilterComponent,
    DeviceDetailBarChartComponent,
    DeviceAlertComponent,
  ],
  exports: [DeviceParentComponent],
})
export class DevicesModule {}
