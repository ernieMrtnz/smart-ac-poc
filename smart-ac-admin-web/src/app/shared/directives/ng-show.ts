import { Directive, ElementRef, Input } from "@angular/core";

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: "[ngShow]",
})
export class NgShowDirective {
  @Input() ngShow: boolean;

  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.onUpdate();
  }

  ngOnChanges(): void {
    this.onUpdate();
  }

  private onUpdate(): void {
    let classList = (this.el.nativeElement as HTMLElement).classList;

    if (this.ngShow) {
      classList.remove("hidden");
    } else {
      classList.add("hidden");
    }
  }
}
