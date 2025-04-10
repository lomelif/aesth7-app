import { Injectable } from "@angular/core"
import { Subject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class SearchBarService {
  private openSearchBarSource = new Subject<void>()

  openSearchBar$ = this.openSearchBarSource.asObservable()

  openSearchBar(): void {
    this.openSearchBarSource.next()
  }
}

