import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  bestSellers = [
    { name: "T-Shirt Dream+", price: "499 MXN", discount: "799 MXN" },
    { name: "T-Shirt Utopia", price: "459 MXN" },
    { name: "T-Shirt Still Alone", price: "659 MXN", discount: "899 MXN" },
    { name: "T-Shirt Moonlight", price: "799 MXN" },
  ];

  newArrivals = [
    { name: "T-Shirt Dream+", price: "499 MXN", discount: "799 MXN" },
    { name: "T-Shirt Utopia", price: "459 MXN" },
    { name: "T-Shirt Still Alone", price: "659 MXN", discount: "899 MXN" },
    { name: "T-Shirt Moonlight", price: "799 MXN" },
  ];

  getBestSellers(): Observable<any[]> {
    return of(this.bestSellers);
  }

  getNewArrivals(): Observable<any[]> {
    return of(this.newArrivals);
  }  

  // Método para obtener productos desde la API
  // obtenerProductos(): Observable<any> {
  //   return this.http.get<any>(this.apiUrl);
  // }


}
