import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { MatSnackBarDismiss } from "@angular/material/snack-bar";
import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";

import { AuthService } from "@app/core/auth";
import { DeviceStatusResponseModel } from "@app/core/data-services";
import { NotificationService } from "@app/shared";
import { environment } from "@env";
import { navigateByUrlWithReload } from "@app/core/helpers";

@Injectable({
  providedIn: "root",
})
export class DeviceStatusHub {
  private _connection: HubConnection;

  constructor(
    private router: Router,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  async connect(): Promise<void> {
    if (this._connection != null) {
      await this.disconnect();
    }

    let connection = this._connection;

    if (connection == null) {
      let options = {
        withCredentials: false,
        accessTokenFactory: () => this.authService.getToken(),
      };

      connection = new HubConnectionBuilder()
        .withUrl(`${environment.apiUrl}/hub/deviceStatus`, options)
        .withAutomaticReconnect()
        .configureLogging(LogLevel.Debug)
        .build();

      connection.on(
        "NotificationErrorMessage",
        (statusResponseModel: DeviceStatusResponseModel) => {
          if (statusResponseModel) {
            this.displayNotificationAlert(statusResponseModel);
          }
        }
      );

      connection.onclose = () => this.disconnect();

      this._connection = connection;
    }

    try {
      if (connection.state == HubConnectionState.Disconnected) {
        await connection.start();
      }
    } catch (err) {
      this.notificationService.error(`Failed to connect to with device hub`);
      console.error(err);
    }
  }

  async disconnect(): Promise<void> {
    if (this._connection) {
      await this._connection.stop();
    }

    this._connection = null;
  }

  private displayNotificationAlert(statusResponse: DeviceStatusResponseModel): void {
    this.notificationService
      .warnForAlert(statusResponse.errorMessage, "Go to device alert")
      .afterDismissed()
      .subscribe(async (snackDismiss: MatSnackBarDismiss) => {
        if (snackDismiss.dismissedByAction) {
          let url = `devices/${statusResponse.deviceID}/details/${statusResponse.deviceDetailID}`;
          await navigateByUrlWithReload(this.router, url);
        }
      });
  }
}
