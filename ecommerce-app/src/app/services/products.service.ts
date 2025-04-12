import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ShowProduct } from '../models/products.interface';
import { CatalogProduct, PaginatedResponse } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  latestProductsUrl = `${environment.apiUrl}/products/latest`;

  getBestSellers(): Observable<any[]> {
    return this.http.get<ShowProduct[]>(`${environment.apiUrl}/products/home/trending`);
  }

  getNewArrivals(): Observable<any[]> {
    return this.http.get<ShowProduct[]>(`${environment.apiUrl}/products/home/latest`);
  }

  getAllProducts(): Observable<any[]> {
    return this.http.get<ShowProduct[]>(`${environment.apiUrl}/products`);
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
  
    console.log('📤 Enviando filtros:', filters);
    return this.http.get<PaginatedResponse<CatalogProduct>>(`${environment.apiUrl}/products/catalog`, { params });
  }
  
}