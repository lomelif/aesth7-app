import { Injectable } from "@angular/core"
import { BehaviorSubject, map, Observable } from "rxjs"

export interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  imageUrl: string
}

@Injectable({
  providedIn: "root",
})
export class CartService {
  private initialItems: CartItem[] = []

  private cartItemsSubject = new BehaviorSubject<CartItem[]>(this.initialItems)
  cartItems$ = this.cartItemsSubject.asObservable()

  constructor() {
    console.log("CartService initialized with items:", this.initialItems)
  }

  getCartItems(): CartItem[] {
    return this.cartItemsSubject.value
  }

  getCartLength$(): Observable<number> {
    return this.cartItems$.pipe(map(items => items.length));
  }

  addToCart(item: CartItem): void {
    const currentItems = this.cartItemsSubject.value
    const existingItem = currentItems.find((i) => i.id === item.id)

    if (existingItem) {
      existingItem.quantity += item.quantity
      this.cartItemsSubject.next([...currentItems])
    } else {
      this.cartItemsSubject.next([...currentItems, item])
    }
  }

  updateQuantity(itemId: number, change: number): void {
    const currentItems = this.cartItemsSubject.value
    const itemIndex = currentItems.findIndex((i) => i.id === itemId)

    if (itemIndex > -1) {
      const newQuantity = currentItems[itemIndex].quantity + change

      if (newQuantity > 0) {
        currentItems[itemIndex].quantity = newQuantity
        this.cartItemsSubject.next([...currentItems])
      } else if (newQuantity === 0) {
        this.removeItem(itemId)
      }
    }
  }

  removeItem(itemId: number): void {
    const currentItems = this.cartItemsSubject.value
    const updatedItems = currentItems.filter((item) => item.id !== itemId)
    this.cartItemsSubject.next(updatedItems)
  }

  getTotal(): number {
    return this.cartItemsSubject.value.reduce((sum, item) => sum + item.price * item.quantity, 0)
  }

  clearCart(): void {
    this.cartItemsSubject.next([])
  }
}

