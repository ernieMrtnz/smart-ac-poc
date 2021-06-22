import { BaseEntityService } from "./base-entity.service";
import { AppEntityState } from "@app/core/akita-extensions/app-entity-state";
import { getEntityType, getIDType } from "@datorama/akita";
import { Component } from "@angular/core";

@Component({
  template: "",
})
export abstract class BaseEntityComponent<
  S extends AppEntityState<E>,
  E = getEntityType<S>,
  EntityID = getIDType<S>
> {
  constructor(private baseService: BaseEntityService<S, E, EntityID>) {}

  abstract ngOnInit(): Promise<void> | void;

  ngOnDestroy(): void {
    this.baseService.onDestroy();
  }
}
