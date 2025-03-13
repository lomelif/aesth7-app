import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';
import { CartService } from '../../services/cart.service';
import { Observable } from 'rxjs';
import { SearchBarService } from '../../services/search-bar.service';
import { SearchBarComponent } from "../search-bar/search-bar.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, CartComponent, SearchBarComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isMenuOpen = false
  cartLength$!: Observable<number>;
  searchResults: string[] = []

  constructor(private cdr: ChangeDetectorRef, private cartService: CartService, private searchBarService: SearchBarService, private router: Router) {}

  ngOnInit() {
    this.cartLength$ = this.cartService.getCartLength$();
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen
  }

  isCartOpen = false

  toggleCart(): void {
    this.isCartOpen = !this.isCartOpen
    console.log("Cart toggled:", this.isCartOpen)
    this.cdr.detectChanges();
  }

  closeCart(): void {
    this.isCartOpen = false
  }

  handleSearch(query: string): void {
    if (!query.trim()) {
      this.searchResults = []
      return
    }

    // Resultados demo para la API
    this.searchResults = [`Result 1 for "${query}"`, `Result 2 for "${query}"`, `Result 3 for "${query}"`]

    console.log(this.searchResults)
  }

  openSearchProgrammatically(): void {
    this.searchBarService.openSearchBar()
  }

  goToLogin() {
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/login']);
    });
  }
}
