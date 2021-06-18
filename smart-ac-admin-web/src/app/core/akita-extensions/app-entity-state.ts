import {
  EntityState,
  EntityStore,
  getEntityType,
  getIDType,
  hasEntity,
  ID,
  QueryEntity,
} from "@datorama/akita";
import { SetEntities } from "@datorama/akita/lib/setEntities";
import { combineLatest, Observable } from "rxjs";
import { map } from "rxjs/operators";

export interface AppEntityState<T> extends EntityState<T, ID> {
  modalLoading: boolean;
  relatedDataLoaded: boolean;
  entitiesWereSet: boolean;
}

export class AppEntityStore<
  S extends AppEntityState<E>,
  E = getEntityType<S>,
  EntityID = getIDType<S>
> extends EntityStore<S, E, EntityID> {
  setModalLoading(modalLoading: boolean): void {
    this.update({
      modalLoading,
    } as Partial<S>);
  }

  getValue(): S {
    return this._value();
  }

  set(
    entities: SetEntities<E>,
    options?: {
      activeId?: EntityID | null;
    }
  ): void {
    super.set(entities, options);

    this.update({
      entitiesWereSet: true,
    } as Partial<S>);
  }

  addOrUpdate(id: ID, entity: E): void {
    let isUpdate = hasEntity(this._value().entities, id);

    if (isUpdate) {
      let ids = id as any as EntityID;
      this.update(ids, entity);
    } else {
      this.add(entity, {
        prepend: true,
      });
    }
  }

  setRelatedDataLoaded(value: boolean = true): void {
    this.update({
      relatedDataLoaded: value,
    } as Partial<S>);
  }

  resetOnlyEntities(): void {
    this.update({
      relatedDataLoaded: false,
      entitiesWereSet: false,
    } as Partial<S>);

    super.set([]);
  }

  constructor(initialState: Partial<S> = {}) {
    super(initialState);
  }
}

export class AppQueryEntity<
  S extends AppEntityState<E>,
  E = getEntityType<S>,
  EntityID = getIDType<S>
> extends QueryEntity<S, E, EntityID> {
  get list$(): Observable<E[]> {
    return this.selectAll();
  }

  get dataLoading$(): Observable<boolean> {
    return this.selectLoading();
  }

  get relatedDataLoaded$(): Observable<boolean> {
    return this.select((x) => x.relatedDataLoaded);
  }

  get modalLoading$(): Observable<boolean> {
    return this.select((state) => state.modalLoading);
  }

  get noEntitiesFound$(): Observable<boolean> {
    return combineLatest([this.select((s) => s.entitiesWereSet), this.selectAll()]).pipe(
      map(([e, list]) => {
        return e === true && list !== null && list.length == 0;
      })
    );
  }

  constructor(store: EntityStore<S, getEntityType<S>, getIDType<S>>) {
    super(store);
  }
}
