import { Router } from "@angular/router";

export function isNotNullOrEmpty(value: unknown): boolean {
  return value !== undefined && value !== null && value !== "";
}

export function enumToArray<T>(enumValues: unknown): T[] {
  let array = Object.values(enumValues);
  let result = array;
  return result as T[];
}

export function navigateByUrlWithReload(router: Router, url: string): Promise<boolean> {
  return router.navigateByUrl("/", { skipLocationChange: true }).then((value) => {
    if (value) {
      return router.navigate([url]);
    }

    return value;
  });
}
