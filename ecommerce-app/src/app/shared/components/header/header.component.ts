// header.component.ts
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { Observable } from 'rxjs';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CartService } from '../../../services/cart.service';
import { SearchBarService } from '../../../services/search-bar.service';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, CartComponent, SearchBarComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  cartLength$!: Observable<number>;
  isCartOpen = false;
  showSearchResults = false;
  private destroy$ = new Subject<void>();

  @Output() search = new EventEmitter<string>();
  @Output() liveSearch = new EventEmitter<string>();
  @Output() closeSearch = new EventEmitter<void>();

  constructor(
    private cdr: ChangeDetectorRef, 
    private cartService: CartService, 
    private searchBarService: SearchBarService, 
    private router: Router
  ) {}

  ngOnInit() {
    this.cartLength$ = this.cartService.getCartLength$();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen;
    this.cdr.detectChanges();
  }

  closeCart(): void {
    this.isCartOpen = false;
  }

  handleSearch(query: string): void {
    if (query.trim()) {
      this.showSearchResults = true;
      this.search.emit(query);
    }
  }

  handleLiveSearch(query: string): void {
    this.showSearchResults = query.length > 0;
    this.liveSearch.emit(query);
  }

  handleCloseSearch(): void {
    this.showSearchResults = false;
    this.closeSearch.emit();
  }

  openSearchProgrammatically(): void {
    this.searchBarService.openSearchBar();
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}