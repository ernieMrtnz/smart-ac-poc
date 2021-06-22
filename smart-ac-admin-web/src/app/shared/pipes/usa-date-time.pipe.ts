import { Pipe, PipeTransform } from "@angular/core";
import { formatDate } from "@angular/common";

@Pipe({
  name: "UsaDateTime",
})
export class UsaDateTimePipe implements PipeTransform {
  transform(date: string | Date): string {
    if (date) {
      let result = formatDate(date, "MM/dd/yy h:mm a", "en-us");
      return result;
    } else {
      return "-";
    }
  }
}
