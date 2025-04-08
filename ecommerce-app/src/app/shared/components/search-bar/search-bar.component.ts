import {
  Component,
  type ElementRef,
  EventEmitter,
  Input,
  type OnDestroy,
  type OnInit,
  Output,
  ViewChild,
} from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { Subscription } from "rxjs"
import { animate, style, transition, trigger } from "@angular/animations"
import { SearchBarService } from "../../../services/search-bar.service"


@Component({
  selector: "app-search-bar",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./search-bar.component.html",
  animations: [
    trigger("slideDown", [
      transition(":enter", [
        style({ opacity: 0, transform: "translateY(-50px)" }),
        animate("300ms ease-out", style({ opacity: 1, transform: "translateY(0)" })),
      ]),
      transition(":leave", [animate("300ms ease-in", style({ opacity: 0, transform: "translateY(-50px)" }))]),
    ]),
  ]
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() placeholder = "Search..."
  @Output() search = new EventEmitter<string>()
  @ViewChild("searchInput") searchInput!: ElementRef<HTMLInputElement>

  isOpen = false
  query = ""
  private subscription: Subscription = new Subscription()

  constructor(private searchBarService: SearchBarService) {}

  ngOnInit(): void {
    this.subscription = this.searchBarService.openSearchBar$.subscribe(() => {
      this.openSearchBar()
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  openSearchBar(): void {
    this.isOpen = true
    // Need to use setTimeout because the element might not be in the DOM yet
    setTimeout(() => {
      this.searchInput?.nativeElement.focus()
    })
  }

  closeSearchBar(): void {
    this.isOpen = false
  }

  handleSearch(): void {
    if (this.query.trim()) {
      this.search.emit(this.query)
    }
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.handleSearch()
    } else if (event.key === "Escape") {
      this.closeSearchBar()
    }
  }
}

