import { Injectable } from "@angular/core";
import { StoreConfig, Store, Query } from "@datorama/akita";

import { UserIdentityModel } from "../data-services";

export interface AuthState {
  identity: UserIdentityModel;
  token: string;
  isLoggedIn: boolean;
}

@Injectable()
@StoreConfig({
  name: "auth",
  resettable: true,
})
export class AuthStore extends Store<AuthState> {
  constructor() {
    super({
      identity: null as UserIdentityModel,
      token: null,
      isLoggedIn: false,
    });

    let tokenInStorage =
      window.localStorage.getItem("authToken1") + window.localStorage.getItem("authToken2");

    if (tokenInStorage) {
      this.update({ token: tokenInStorage });
    }
  }

  akitaPreUpdate(prevState: AuthState, nextState: AuthState): AuthState {
    if (nextState.token) {
      let tokenHalfLength = Math.ceil(nextState.token.length / 2);

      window.localStorage.setItem("authToken1", nextState.token.substring(0, tokenHalfLength));

      window.localStorage.setItem("authToken2", nextState.token.substring(tokenHalfLength));

      nextState.isLoggedIn = true;
    } else {
      window.localStorage.removeItem("authToken1");
      window.localStorage.removeItem("authToken2");

      nextState.isLoggedIn = false;
    }

    return nextState;
  }
}

@Injectable()
export class AuthQuery extends Query<AuthState> {
  constructor(protected store: AuthStore) {
    super(store);
  }
}
