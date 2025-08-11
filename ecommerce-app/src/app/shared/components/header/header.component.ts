import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { Observable } from 'rxjs';
import { SearchBarComponent } from "../search-bar/search-bar.component";
import { CartService } from '../../../services/cart.service';
import { SearchBarService } from '../../../services/search-bar.service';
import { Subject } from 'rxjs';
import { ShowProduct } from '../../../models/products.interface';
import { ProductsService } from '../../../services/products.service';
import { SearchResultsComponent } from "../search-results/search-results.component";
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, CartComponent, SearchBarComponent, SearchResultsComponent],
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  isMenuOpen = false;
  cartLength$!: Observable<number>;
  isCartOpen = false;
  showSearchResults = false;
  searchQuery = '';
  searchResults: ShowProduct[] = [];
  products: ShowProduct[] = [];
  private destroy$ = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef, 
    private cartService: CartService, 
    private searchBarService: SearchBarService, 
    private router: Router,
    private productsService: ProductsService,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    this.cartLength$ = this.cartService.getCartLength$();
    this.loadAllProducts();
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadAllProducts(): void {
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
      }
    });
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
      this.searchQuery = query;
      this.showSearchResults = true;
      this.searchResults = this.filterProducts(query);
      this.renderer.addClass(document.body, 'overflow-hidden');
    }
  }

  handleLiveSearch(query: string): void {
    this.searchQuery = query;
    this.showSearchResults = query.length > 0;
    if (this.showSearchResults) {
      this.searchResults = this.filterProducts(query);
      this.renderer.addClass(document.body, 'overflow-hidden');
    } else {
      this.renderer.removeClass(document.body, 'overflow-hidden');
    }
  }

  handleCloseSearch(): void {
    this.showSearchResults = false;
    this.searchQuery = '';
    this.searchResults = [];
    this.renderer.removeClass(document.body, 'overflow-hidden');
  }
  
  private filterProducts(query: string): ShowProduct[] {
    return this.products.filter(product => 
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  openSearchProgrammatically(): void {
    this.searchBarService.openSearchBar();
  }

  goToLogin() {
    const token = localStorage.getItem('token');
    if(this.isTokenExpired(token)){
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/profile']);
    }
  }

  isTokenExpired(token: string | null): boolean {
    if(token == null) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
  }
}