import { Component } from "@angular/core";
import { Router } from "@angular/router";

import { NotificationService } from "@app/shared";

@Component({
  selector: "app-landing",
  templateUrl: "./landing.component.html",
})
export class LandingComponent {
  constructor(private router: Router, private notificationService: NotificationService) {}

  async goToDevices(): Promise<void> {
    await this.router.navigateByUrl("devices");
  }

  async goToEmployees(): Promise<void> {
    await this.router.navigateByUrl("users");
  }
}
