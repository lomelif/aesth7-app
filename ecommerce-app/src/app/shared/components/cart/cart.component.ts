import { Component, Input, Output, EventEmitter, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { trigger, transition, style, animate } from "@angular/animations"
import { CartItem, CartService } from "../../services/cart.service"

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

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    // Obtener los elementos del carrito del servicio
    this.cartItems = this.cartService.getCartItems()
    console.log("Cart component initialized with items:", this.cartItems)

    // Suscribirse a los cambios en el carrito
    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items
      console.log("Cart items updated:", this.cartItems)
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
}

