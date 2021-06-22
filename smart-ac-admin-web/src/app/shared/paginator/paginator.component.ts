import { Component, Input, Output, EventEmitter } from "@angular/core";
import { PageEvent } from "@angular/material/paginator";

import { PaginatorEvent } from "./paginator.event";

@Component({
  selector: "app-paginator",
  templateUrl: "./paginator.component.html",
})
export class PaginatorComponent {
  @Input() totalCount: number;
  @Input() pageSize: number;
  @Input() set currentPage(value: number) {
    this.pageIndex = value - 1;
  }
  @Output() pageChange = new EventEmitter<PaginatorEvent>();

  pageSizeOptions: number[] = [5, 10, 25, 50];
  pageIndex = 0;

  onPageChange(pageEvent: PageEvent): void {
    let event = {
      page: pageEvent.pageIndex + 1,
      pageSize: pageEvent.pageSize,
    } as PaginatorEvent;

    this.pageChange.emit(event);

    let element = document.querySelector("mat-sidenav-content");
    element.scrollTo(0, 0);
  }
}
