import { ProductActionsComponent } from './components/product-actions/product-actions.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import type { Product, Size } from "../../interfaces/product.interface"
import { HeaderComponent } from "../../../shared/components/header/header.component";
import { ProductGalleryComponent } from "./components/product-gallery/product-gallery.component";
import { ProductInfoComponent } from "./components/product-info/product-info.component";
import { ProductQuantitySelectorComponent } from "./components/product-quantity-selector/product-quantity-selector.component";
import { ProductSizeSelectorComponent } from "./components/product-size-selector/product-size-selector.component";

@Component({
  selector: "app-product-page",
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, ProductGalleryComponent, ProductInfoComponent, ProductSizeSelectorComponent, ProductQuantitySelectorComponent, ProductActionsComponent],
  templateUrl: "./product-page.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductPageComponent implements OnInit {
  product: Product
  selectedImage: string
  quantity = 1

  constructor() {
    this.product = {
      id: "1",
      name: "DreaM+",
      price: 899.00,
      description: "As always, this is not for normal people, this is for ICONS.",
      sizes: [
        { name: "XS", available: true, selected: true },
        { name: "S", available: true, selected: false },
        { name: "M", available: true, selected: false },
        { name: "L", available: true, selected: false },
        { name: "XL", available: true, selected: false },
        { name: "XXL", available: true, selected: false },
      ],
      images: ["assets/img/T-Shirt 1.jpeg", "assets/img/T-Shirt 2.jpeg"],
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

  

  addToCart(): void {
    console.log("Producto agregado al carrito", {
      product: this.product.name,
      quantity: this.quantity,
      size: this.product.sizes.find((s) => s.selected)?.name
    })
  }

  buyNow(): void {
    this.addToCart()
    console.log("Redirigiendo a checkout...")
  }

  
}

