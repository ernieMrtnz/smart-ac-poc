import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";

import { NotificationService } from "@app/shared";
import { AuthCredentialModel } from "@app/core/data-services";
import { AuthService } from "../../core/auth";

@Component({
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  logo: string;
  loginForm: FormGroupTyped<AuthCredentialModel>;
  loading$: BehaviorSubject<boolean>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    this.loading$ = new BehaviorSubject(false);

    this.loginForm = this.fb.group({
      login: ["", Validators.required],
      password: ["", Validators.required],
    }) as FormGroupTyped<AuthCredentialModel>;
  }

  async onLogin(): Promise<void> {
    this.loading$.next(true);

    let dto = this.loginForm.value;

    try {
      let result = await this.authService.login(dto);

      if (result.isSuccess) {
        let url = (this.route.snapshot.queryParams.returnUrl as string) || "/";
        void this.router.navigateByUrl(url);
      } else {
        this.notificationService.error(result.errorMessage);
      }
    } catch (error) {
      this.notificationService.error("Incorrect credentials");
    } finally {
      this.loading$.next(false);
    }
  }
}
