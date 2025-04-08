import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductCategoriesComponent } from "../../components/product-categories/product-categories.component";
import { ServiceFeaturesComponent } from "../../components/service-features/service-features.component";
import { NewArrivalsComponent } from "../../components/new-arrivals/new-arrivals.component";
import { CartComponent } from '../../components/cart/cart.component';
import { ShowProduct } from '../../../models/products.interface';
import { Features, ProductCategories } from '../../../models/info.interface';
import { ProductsService } from '../../../services/products.service';
import { InfoService } from '../../../services/info.service';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, HeroComponent, BestSellersComponent, FooterComponent, ProductCategoriesComponent, ServiceFeaturesComponent, NewArrivalsComponent, CartComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit{

  bestSellers: ShowProduct[] = [];
  newArrivals: ShowProduct[] = [];
  products: any = [];
  productCategories: ProductCategories[] = [];
  features: Features[] = [];
  loading: boolean = true;

  constructor(private productsService: ProductsService, private infoService: InfoService){}

  ngOnInit(): void {
    this.productsService.getBestSellers().subscribe({
      next: (products) => {
        this.bestSellers = products.map(product => ({
          name: product.name,
          price: product.price,
          images: product.images,
          discount: product.discount
        }));
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    })
    this.productsService.getNewArrivals().subscribe({
      next: (products) => {
        this.newArrivals = products.map(product => ({
          name: product.name,
          price: product.price,
          images: product.images,
          discount: product.discount
        }));
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    })
    this.infoService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    })
    this.infoService.getFeatures().subscribe((data) => {
      this.features = data;
    })
    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
        console.log(this.products);
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  

  
}
