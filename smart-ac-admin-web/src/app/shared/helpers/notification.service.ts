import { Injectable, NgZone } from "@angular/core";
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
import { BehaviorSubject } from "rxjs";

import { ApiException } from "@app/core/data-services";

@Injectable({
  providedIn: "root",
})
export class NotificationService {
  constructor(private readonly snackBar: MatSnackBar, private readonly zone: NgZone) {}

  updatedEntity$ = new BehaviorSubject<string | number>(null);
  configTimeout = 8000;

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

  warn(message: string): void {
    this.show(message, {
      panelClass: "warning-notification-overlay",
    });
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

  private show(message: string, configuration: MatSnackBarConfig): void {
    let config = {
      duration: this.configTimeout,
      verticalPosition: "top",
      horizontalPosition: "right",
      ...configuration,
    } as MatSnackBarConfig;

    this.zone.run(() => this.snackBar.open(message, null, config));
  }
}
