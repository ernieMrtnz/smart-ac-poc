import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, of } from "rxjs";
import { catchError, map, tap } from "rxjs/operators";
import { AuthQuery, AuthState, AuthStore } from "./auth.state";

import {
  AuthCredentialModel,
  AuthenticationClient,
  AuthLoginResponseModel,
  UserIdentityModel,
} from "../data-services";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private isAuthInProcess$: BehaviorSubject<boolean>;
  isLoggedIn$ = this.authQuery.select((state) => state.isLoggedIn);

  constructor(
    private authClient: AuthenticationClient,
    private authStore: AuthStore,
    private authQuery: AuthQuery
  ) {
    this.isAuthInProcess$ = new BehaviorSubject(false);
  }

  getToken(): string {
    return this.authQuery.getValue().token;
  }

  get isLoggedIn(): boolean {
    return this.authQuery.getValue().isLoggedIn;
  }

  get userId(): number {
    let identity = this.authQuery.getValue().identity;
    return identity ? identity.id : null;
  }

  get isLoading$(): Observable<boolean> {
    return this.isAuthInProcess$.asObservable();
  }

  get identity$(): Observable<UserIdentityModel> {
    return this.authQuery.select((s) => s.identity);
  }

  async login(dto: AuthCredentialModel): Promise<AuthLoginResponseModel> {
    const tokenResult = await this.authClient.login(dto).toPromise();

    if (tokenResult.isSuccess) {
      this.authStore.update({ token: tokenResult.token });
    }

    return tokenResult;
  }

  logout(): void {
    let state = {
      identity: null as UserIdentityModel,
      token: "",
    } as AuthState;

    this.authStore.update(state);
  }

  getHomePathByRole(): string {
    return "dashboard";
  }

  setAuthTokenQueryParam(params: Record<string, unknown>): void {
    params.authToken = this.getToken();
  }

  getState(): Observable<AuthState> {
    let state = this.authQuery.getValue();
    let isAuthInProcess$ = this.isAuthInProcess$;

    //If user is not logged or is logged and roles are loaded
    if (!state.token || state.identity) {
      return of(state);
    }

    let timeoutId = setTimeout(function () {
      isAuthInProcess$.next(true);
    }, 300);

    return this.authClient.identity().pipe(
      tap((_) => {
        clearTimeout(timeoutId);
        isAuthInProcess$.next(false);
      }),
      map((identityResult) => {
        this.authStore.update({ identity: identityResult });
        return this.authQuery.getValue();
      }),
      catchError((err) => {
        this.logout();

        clearTimeout(timeoutId);
        isAuthInProcess$.next(false);

        return of(this.authQuery.getValue());
      })
    );
  }
}
