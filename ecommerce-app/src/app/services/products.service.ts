import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from '../../environments/environment';
import { ShowProduct } from '../models/products.interface';

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
}
