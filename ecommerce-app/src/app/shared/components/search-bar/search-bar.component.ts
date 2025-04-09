import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, Renderer2 } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Subscription } from "rxjs";
import { animate, style, transition, trigger } from "@angular/animations";
import { SearchBarService } from "../../../services/search-bar.service";
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';

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
  @Output() liveSearch = new EventEmitter<string>()
  @ViewChild("searchInput") searchInput!: ElementRef<HTMLInputElement>

  isOpen = false
  query = ""
  private subscription: Subscription = new Subscription()
  private searchSubject = new Subject<string>()

  constructor(
    private searchBarService: SearchBarService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.subscription = this.searchBarService.openSearchBar$.subscribe(() => {
      this.openSearchBar()
    })

    this.subscription.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged()
      ).subscribe(query => {
        this.liveSearch.emit(query)
      })
    )
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }

  openSearchBar(): void {
    this.isOpen = true
    this.renderer.addClass(document.body, 'overflow-hidden');
    setTimeout(() => {
      this.searchInput?.nativeElement.focus()
    })
  }

  closeSearchBar(): void {
    this.isOpen = false
    this.query = ''
    this.renderer.removeClass(document.body, 'overflow-hidden');
    this.liveSearch.emit('')
  }

  handleSearch(): void {
    if (this.query.trim()) {
      this.search.emit(this.query)
    }
  }

  onInputChange(): void {
    this.searchSubject.next(this.query)
  }

  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter") {
      this.handleSearch()
    } else if (event.key === "Escape") {
      this.closeSearchBar()
    }
  }
}