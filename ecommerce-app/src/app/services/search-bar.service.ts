import { Injectable } from "@angular/core"
import { Subject } from "rxjs"

@Injectable({
  providedIn: "root",
})
export class SearchBarService {
  private openSearchBarSource = new Subject<void>()

  // Observable that components can subscribe to
  openSearchBar$ = this.openSearchBarSource.asObservable()

  // Method to call from anywhere to open the search bar
  openSearchBar(): void {
    this.openSearchBarSource.next()
  }
}

