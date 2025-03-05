import { Component, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { Product, Color, Size } from "../../interfaces/product.interface"
import { HeaderComponent } from "../../../shared/components/header/header.component";

@Component({
  selector: "app-product-page",
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent],
  templateUrl: "./product-page.component.html"
})
export class ProductPageComponent implements OnInit {
  product: Product
  selectedImage: string
  quantity = 1
  isDescriptionOpen = false
  isShippingOpen = false

  constructor() {
    this.product = {
      id: "1",
      name: "Strawberry Tee Black",
      price: 899,
      description: "As always, this is not for normal people, this is for ICONS.",
      colors: [{ name: "Black", value: "black", selected: true }],
      sizes: [
        { name: "XS", available: true, selected: true },
        { name: "S", available: true, selected: false },
        { name: "M", available: true, selected: false },
        { name: "L", available: true, selected: false },
        { name: "XL", available: true, selected: false },
        { name: "XXL", available: true, selected: false },
      ],
      images: ["/placeholder.svg?height=600&width=600", "/placeholder.svg?height=600&width=600"],
      details: ["250 gsm 100% premium cotton.", "High-quality digital print.", "Drop shoulders, oversize fit."],
      promotions: [
        'AGREGA 3 AL CARRITO Y SOLO PAGA 2 USANDO EL CÓDIGO "COMBO".',
        "GASTA $3,999 O MAS Y AGREGA 1 MISTERY BOX AL CARRITO GRATIS.",
      ],
    }
    this.selectedImage = this.product.images[0]
  }

  ngOnInit(): void {}

  selectImage(image: string): void {
    this.selectedImage = image
  }

  selectColor(color: Color): void {
    this.product.colors.forEach((c: Color) => (c.selected = c === color))
  }

  selectSize(size: Size): void {
    this.product.sizes.forEach((s: Size) => (s.selected = s === size))
  }

  decreaseQuantity(): void {
    if (this.quantity > 1) {
      this.quantity--
    }
  }

  increaseQuantity(): void {
    this.quantity++
  }

  toggleDescription(): void {
    this.isDescriptionOpen = !this.isDescriptionOpen
  }

  toggleShipping(): void {
    this.isShippingOpen = !this.isShippingOpen
  }

  addToCart(): void {
    console.log("Producto agregado al carrito", {
      product: this.product.name,
      quantity: this.quantity,
      size: this.product.sizes.find((s) => s.selected)?.name,
      color: this.product.colors.find((c) => c.selected)?.name,
    })
  }

  buyNow(): void {
    this.addToCart()
    console.log("Redirigiendo a checkout...")
  }

  getSelectedColor(): string {
    const selectedColor = this.product.colors.find((c: Color) => c.selected)
    return selectedColor ? selectedColor.name : ""
  }

  getSelectedSize(): string {
    const selectedSize = this.product.sizes.find((s: Size) => s.selected)
    return selectedSize ? selectedSize.name : ""
  }
}

