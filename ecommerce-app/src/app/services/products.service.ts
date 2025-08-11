import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ShowProduct } from '../models/products.interface';
import { CatalogProduct, PaginatedResponse, Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  latestProductsUrl = `${environment.apiUrl}/products/latest`;

  getBestSellers(): Observable<any[]> {
    return this.http.get<ShowProduct[]>(`${environment.apiUrl}/api/Product/Trending`);
  }

  getNewArrivals(): Observable<any[]> {
    return this.http.get<ShowProduct[]>(`${environment.apiUrl}/api/Product/Latest`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<ShowProduct[]>(`${environment.apiUrl}/api/Product`);
  }

  getCatalogProducts(
    page: number = 0,
    size: number = 8,
    sortBy: string,
    filters?: { priceRange?: string; color?: string, type?: string }
  ): Observable<PaginatedResponse<CatalogProduct>> {
    let params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('sortBy', sortBy);
  
    if (filters?.priceRange) {
      params = params.set('priceRange', filters.priceRange);
    }
  
    if (filters?.color) {
      params = params.set('color', filters.color);
    }

    if (filters?.type) {
      params = params.set('type', filters.type);
    }
  
    return this.http.get<PaginatedResponse<CatalogProduct>>(`${environment.apiUrl}/api/Product/Catalog`, { params });
  }

  getProductById(id:string): Observable<Product> {
    return this.http.get<Product>(`${environment.apiUrl}/api/Product/${id}`);
  }
  
}