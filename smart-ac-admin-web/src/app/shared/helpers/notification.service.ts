import { Injectable, NgZone } from "@angular/core";
import {
  MatSnackBar,
  MatSnackBarConfig,
  MatSnackBarRef,
  TextOnlySnackBar,
} from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";

import { ApiException } from "@app/core/data-services";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar, private readonly zone: NgZone) {}

  updatedEntity$ = new BehaviorSubject<string | number>(null);
  configTimeout = 15000;

  info(message: string): void {
    this.show(message, {
      panelClass: "info-notification-overlay",
    });
  }

  success(message: string): void {
    this.show(message, {
      panelClass: "success-notification-overlay",
    });
  }

  warn(message: string, action: string = null): void {
    this.show(
      message,
      {
        panelClass: "warning-notification-overlay",
      },
      action
    );
  }

  warnForAlert(message: string, action: string = null): MatSnackBarRef<TextOnlySnackBar> {
    return this.snackBar.open(
      message,
      action,
      this.getConfig({
        panelClass: "warning-notification-overlay",
      })
    );
  }

  error(message: string): void {
    this.show(message, {
      panelClass: "error-notification-overlay",
    });
  }

  exception(exception: ApiException): void {
    let errorMessage = "";

    if (exception.response) {
      try {
        let errorResponse = JSON.parse(exception.response) as {
          message: string;
        };

        errorMessage = errorResponse?.message;
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error(exception);
    }

    errorMessage = errorMessage || "Unexpected error. Please try again later";

    this.error(errorMessage);
  }

  private show(message: string, configuration: MatSnackBarConfig, action: string = null): void {
    this.zone.run(() => this.snackBar.open(message, action, this.getConfig(configuration)));
  }

  private getConfig(configuration: MatSnackBarConfig): MatSnackBarConfig {
    let config = {
      duration: this.configTimeout,
      verticalPosition: "top",
      horizontalPosition: "right",
      ...configuration,
    } as MatSnackBarConfig;

    return config;
  }
}
