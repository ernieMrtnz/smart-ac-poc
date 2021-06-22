import { EntityStore, getEntityType, getIDType, ID } from "@datorama/akita";
import { Observable, of, combineLatest } from "rxjs";
import { switchMap } from "rxjs/operators";

import { PageResult } from "../data-services";
import { AppEntityState, AppEntityStore, AppQueryEntity } from "./app-entity-state";

export interface AppPaginationResponse<E> {
  currentPage: number;
  perPage: number;
  data: E[];
  total: number;
}

export interface AppPagedEntityState<T> extends AppEntityState<T> {
  currentPage: number;
  perPage: number;
  total: number;
}

export class AppPagedEntityStore<
  S extends AppPagedEntityState<E>,
  E,
  EntityID = ID
> extends AppEntityStore<S, E, EntityID> {
  //Set data with total count
  setPaginationResponse(pageResponse: PageResult<E>, page: number, pageSize: number): void {
    this.update({
      currentPage: page,
      perPage: pageSize,
      total: pageResponse.totalCount,
    } as Partial<S>);

    this.set(pageResponse.page);
  }

  constructor(initialState: Partial<S> = {}) {
    super(initialState);
  }
}

export class AppPagedQueryEntity<
  S extends AppPagedEntityState<E>,
  E,
  EntityID = ID
> extends AppQueryEntity<S, E, EntityID> {
  get paginationResponse$(): Observable<AppPaginationResponse<E>> {
    return combineLatest([this.selectAll(), this.select((x) => x.total)]).pipe(
      switchMap(([entities, totalCount]) => {
        let value = this.getValue();

        let result = {
          currentPage: value.currentPage,
          perPage: value.perPage,
          total: totalCount,
          data: entities,
        } as AppPaginationResponse<E>;

        return of(result);
      })
    );
  }

  constructor(store: EntityStore<S, getEntityType<S>, getIDType<S>>) {
    super(store);
  }
}
