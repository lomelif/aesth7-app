import { ProductActionsComponent } from './components/product-actions/product-actions.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA, type OnInit } from "@angular/core"
import { CommonModule } from "@angular/common"
import { FormsModule } from "@angular/forms"
import { ProductGalleryComponent } from "./components/product-gallery/product-gallery.component";
import { ProductInfoComponent } from "./components/product-info/product-info.component";
import { ProductQuantitySelectorComponent } from "./components/product-quantity-selector/product-quantity-selector.component";
import { ProductSizeSelectorComponent } from "./components/product-size-selector/product-size-selector.component";
import { Product, Size } from '../../../../models/product.interface';
import { HeaderComponent } from '../../../../shared/components/header/header.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ProductsService } from '../../../../services/products.service';
import { CartItem, CartService } from '../../../../services/cart.service';
import { CheckoutService } from '../../../../services/checkout.service';

@Component({
  selector: "app-product-page",
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent,ProductGalleryComponent, ProductInfoComponent, ProductSizeSelectorComponent, ProductQuantitySelectorComponent, ProductActionsComponent],
  templateUrl: "./product-page.component.html",
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProductPageComponent implements OnInit {
  product: Product
  productId!: string
  selectedImage: string
  quantity = 1
  isLoading = true;

  cartItems: CartItem[] = []
  

  constructor(private route: ActivatedRoute, private productsService: ProductsService, private cartService: CartService, private checkoutService: CheckoutService, private router: Router) {
    this.product = {
      id: "1",
      name: "DreaM+",
      type: "T-Shirt",
      price: 899.00,
      color: "black",
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
      release: new Date(),
      availability: true 
    }
    this.selectedImage = this.product.images[0]
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.isLoading = true;
      this.productId = params.get('id')!;
      this.productsService.getProductById(this.productId).subscribe({
        next: (product) => {
          const sizeNames = product.sizes as unknown as string[];

          this.product = {
            ...product,
            sizes: sizeNames.map((sizeName: string, index: number) => ({
              name: sizeName,
              available: true,
              selected: index === 0
            }))
          };

          this.selectedImage = this.product.images[0];
          this.isLoading = false;
        },
        error: (error) => {
          this.isLoading = false;
        }
      },
      )
    });

    this.cartItems = this.cartService.getCartItems()

    this.cartService.cartItems$.subscribe((items) => {
      this.cartItems = items
    })
  }

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
    const selectedSize = this.product.sizes.find((s) => s.selected)?.name ?? 'N/A';

    const item = {
      id: Number(this.product.id),
      name: this.product.name,
      size: selectedSize,
      price: this.product.price,
      quantity: this.quantity,
      image: this.product.images[0]
    };

    this.cartService.addToCart(item);
  }

  buyNow(): void {
    this.addToCart();

    const token = localStorage.getItem('token');
    if(this.isTokenExpired(token)){
      this.router.navigate(['/login']);
    } else {
      this.checkout();
    }
  }

  isTokenExpired(token: string | null): boolean {
    if(token == null) return true;
    const payload = JSON.parse(atob(token.split('.')[1]));
    const exp = payload.exp;
    const now = Math.floor(Date.now() / 1000);
    return exp < now;
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

