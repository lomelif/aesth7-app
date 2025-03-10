import { InfoService } from './../../services/info.service';
import { ProductsService } from './../../services/products.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { FooterComponent } from '../../components/footer/footer.component';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';
import { BannerComponent } from "../../components/banner/banner.component";
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { ProductCategoriesComponent } from "../../components/product-categories/product-categories.component";
import { ServiceFeaturesComponent } from "../../components/service-features/service-features.component";
import { NewArrivalsComponent } from "../../components/new-arrivals/new-arrivals.component";
import { CartComponent } from '../../components/cart/cart.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HeaderComponent, HeroComponent, BestSellersComponent, FooterComponent, ProductCategoriesComponent, ServiceFeaturesComponent, NewArrivalsComponent, CartComponent],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit{

  bestSellers: any[] = [];
  newArrivals: any[] = [];
  productCategories: any[] = [];
  features: any[] = [];

  constructor(private productsService: ProductsService, private infoService: InfoService){}

  ngOnInit(): void {
    this.productsService.getBestSellers().subscribe((data) => {
      this.bestSellers = data;
    })
    this.productsService.getNewArrivals().subscribe((data) => {
      this.newArrivals = data;
    })
    this.infoService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    })
    this.infoService.getFeatures().subscribe((data) => {
      this.features = data;
    })
  }

  

  
}
