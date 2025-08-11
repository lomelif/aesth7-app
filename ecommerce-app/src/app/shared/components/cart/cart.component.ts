import { Component, Input, Output, EventEmitter, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { trigger, transition, style, animate } from "@angular/animations"
import { CartItem } from "../../../models/cart.interface"
import { CartService } from "../../../services/cart.service"
import { loadStripe } from '@stripe/stripe-js';
import { HttpClient } from '@angular/common/http';
import { CheckoutService } from "../../../services/checkout.service"

@Component({
  selector: "app-cart",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./cart.component.html",
  animations: [
    trigger("slideInOut", [
      transition(":enter", [
        style({ transform: "translateX(100%)" }),
        animate("300ms ease-out", style({ transform: "translateX(0%)" })),
      ]),
      transition(":leave", [animate("300ms ease-in", style({ transform: "translateX(100%)" }))]),
    ]),
  ],
})
export class CartComponent implements OnInit {
  @Input() isOpen = false
  @Output() close = new EventEmitter<void>()

  cartItems: CartItem[] = []
  orderNote = ""

  constructor(private cartService: CartService, private checkoutService: CheckoutService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems()

    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items
    })
  }

  get total(): number {
    return this.cartService.getTotal()
  }

  closeCart(): void {
    this.close.emit()
  }

  updateQuantity(item: CartItem, change: number): void {
    this.cartService.updateQuantity(item.id, change)
  }

  removeItem(itemId: number): void {
    this.cartService.removeItem(itemId)
  }

  checkout(): void {
    if (this.cartItems.length === 0) {
      return
    }

    const itemsCheckout = this.cartItems.map(item => ({
      ...item,
      price: item.price * 100
    }));

    this.checkoutService.redirectToCheckout(itemsCheckout);
  }
}

