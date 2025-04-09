import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { HeaderComponent } from '../../components/header/header.component';
import { HeroComponent } from '../../components/hero/hero.component';
import { BestSellersComponent } from '../../components/best-sellers/best-sellers.component';
import { ProductCategoriesComponent } from "../../components/product-categories/product-categories.component";
import { ServiceFeaturesComponent } from "../../components/service-features/service-features.component";
import { NewArrivalsComponent } from "../../components/new-arrivals/new-arrivals.component";
import { FooterComponent } from '../../components/footer/footer.component';
import { ShowProduct } from '../../../models/products.interface';
import { Features, ProductCategories } from '../../../models/info.interface';
import { ProductsService } from '../../../services/products.service';
import { InfoService } from '../../../services/info.service';
import { SearchResultsComponent } from '../../components/search-results/search-results.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    HeaderComponent,
    HeroComponent,
    BestSellersComponent,
    ProductCategoriesComponent,
    ServiceFeaturesComponent,
    NewArrivalsComponent,
    FooterComponent,
  ],
  templateUrl: './home-page.component.html'
})
export class HomePageComponent implements OnInit {
  bestSellers: ShowProduct[] = [];
  newArrivals: ShowProduct[] = [];
  products: any = [];
  productCategories: ProductCategories[] = [];
  features: Features[] = [];
  loading: boolean = true;
  showSearchResults = false;
  searchQuery = '';
  searchResults: any[] = [];

  constructor(
    private productsService: ProductsService, 
    private infoService: InfoService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
    this.loadCategories();
    this.loadFeatures();
  }

  private loadProducts(): void {
    this.productsService.getBestSellers().subscribe({
      next: (products) => {
        this.bestSellers = products;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });

    this.productsService.getNewArrivals().subscribe({
      next: (products) => {
        this.newArrivals = products;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
      }
    });

    this.productsService.getAllProducts().subscribe({
      next: (products) => {
        this.products = products;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  private loadCategories(): void {
    this.infoService.getProductCategories().subscribe((data) => {
      this.productCategories = data;
    });
  }

  private loadFeatures(): void {
    this.infoService.getFeatures().subscribe((data) => {
      this.features = data;
    });
  }

  handleLiveSearch(query: string): void {
    this.searchQuery = query;
    this.showSearchResults = query.length > 0;
    
    if (this.showSearchResults) {
      this.searchResults = this.products.filter((product: any) => 
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        (product.description && product.description.toLowerCase().includes(query.toLowerCase()))
      );
    }
  }

  handleSearch(query: string): void {
    this.handleLiveSearch(query);
  }

  clearSearch(): void {
    this.showSearchResults = false;
    this.searchQuery = '';
    this.searchResults = [];
  }
}