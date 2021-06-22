import { getEntityType, getIDType } from "@datorama/akita";

import { AppEntityState, AppEntityStore } from "@app/core/akita-extensions/app-entity-state";
import { NotificationService } from "@app/shared";

export abstract class BaseEntityService<
  S extends AppEntityState<E>,
  E = getEntityType<S>,
  EntityID = getIDType<S>
> {
  constructor(
    private baseStore: AppEntityStore<S, E, EntityID>,
    private baseNotificationService: NotificationService
  ) {}

  protected async loadEntitiesWrapper(func: () => Promise<void>): Promise<void> {
    await this.apiCallWrapper(func);
  }

  protected async loadRelatedDataWrapper(func: () => Promise<void>): Promise<void> {
    this.baseStore.setLoading(true);

    try {
      await func();
      this.baseStore.setRelatedDataLoaded(true);
    } catch (err) {
      this.baseNotificationService.exception(err);
    } finally {
      this.baseStore.setLoading(false);
    }
  }

  protected async apiCallWrapper(
    func: () => Promise<void>,
    changeModalLoadingParam: boolean = false
  ): Promise<void> {
    let setLoadingFunc = changeModalLoadingParam
      ? this.baseStore.setModalLoading
      : this.baseStore.setLoading;

    try {
      setLoadingFunc.call(this.baseStore, true);
      await func();
    } catch (err) {
      this.baseNotificationService.exception(err);
    } finally {
      setLoadingFunc.call(this.baseStore, false);
    }
  }

  onDestroy(): void {
    if (this.baseStore.resettable) {
      this.baseStore.reset();
    }
  }
}
