import { Component, OnInit } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import { filter, map } from "rxjs/operators";
import { Observable } from "rxjs";

import { AuthService } from "@app/core/auth";
import { DeviceStatusHub } from "@app/features/common/hubs";

interface MenuItemRoute {
  link: string;
  label: string;
  visible: boolean;
}

interface MenuItem {
  title: string | null;
  routes: MenuItemRoute[];
}

@Component({
  selector: "app-layout",
  templateUrl: "./layout.component.html",
  styleUrls: ["./layout.component.scss"],
})
export class LayoutComponent implements OnInit {
  logo = "assets/logo.png";
  navigation: MenuItem[];
  isAuthenticated$: Observable<boolean>;
  isStateLoading$: Observable<boolean>;
  fullScreenPage$: Observable<boolean>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private deviceStatusHub: DeviceStatusHub
  ) {}

  async ngOnInit(): Promise<void> {
    this.isAuthenticated$ = this.authService.isLoggedIn$;
    this.isStateLoading$ = this.authService.isLoading$;

    this.authService.identity$.subscribe((identity) => {
      if (identity) {
        this.navigation = this.getMenu();

        this.navigation.forEach((item) => {
          item.routes = item.routes.filter((x) => x.visible);
        });

        this.navigation = this.navigation.filter((x) => x.routes.length > 0);
      } else {
        this.navigation = [];
      }
    });

    this.fullScreenPage$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd),
      map((event) => {
        let navEndEvent = event as NavigationEnd;
        return navEndEvent.urlAfterRedirects.includes("your-url");
      })
    );

    await this.deviceStatusHub.connect();
  }

  private getMenu(): MenuItem[] {
    let result: MenuItem[] = [
      {
        title: "",
        routes: [
          {
            link: "users",
            label: "User Management",
            visible: true,
          },
        ],
      },
      {
        title: "",
        routes: [
          {
            link: "devices",
            label: "Device Management",
            visible: true,
          },
        ],
      },
    ];

    return result;
  }

  async onLogoutClick(): Promise<void> {
    this.authService.logout();
    await this.deviceStatusHub.disconnect();
    await this.router.navigate(["/login"]);
  }
}
