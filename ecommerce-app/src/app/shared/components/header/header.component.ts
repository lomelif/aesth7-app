import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterLink, CartComponent],
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  isMenuOpen = false

  constructor(private cdr: ChangeDetectorRef) {}

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
}
