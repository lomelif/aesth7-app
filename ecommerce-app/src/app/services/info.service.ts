import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Features, ProductCategories } from '../models/info.interface';

@Injectable({
  providedIn: 'root'
})
export class InfoService {

  constructor(private http: HttpClient) { }

    productCategories: ProductCategories[] = [
      {
        id: "tshirts",
        name: "T-SHIRTS",
        image: "https://res.cloudinary.com/duhwn48mc/image/upload/v1743797906/Shirt7C_uzzgrf.jpg",
        link: "/t-shirts",
      },
      {
        id: "hoodies",
        name: "HOODIES",
        image: "https://res.cloudinary.com/duhwn48mc/image/upload/v1744068760/CategoryHoodie_xea2qg.jpg",
        link: "/hoodies",
      },
      {
        id: "new",
        name: "NEW PRODUCTS",
        image: "https://res.cloudinary.com/duhwn48mc/image/upload/v1744067465/Long1A_xpmz37.jpg",
        link: "/new-arrivals",
      },
    ];

    features: Features[] = [
      {
        title: "ENVIO GRATIS",
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z"></path><path d="m3 9 2.45-4.9A2 2 0 0 1 7.24 3h9.52a2 2 0 0 1 1.8 1.1L21 9"></path><path d="M12 3v6"></path></svg>`,
        description: "Envío gratis a todo México.",
      },
      {
        title: "SERVICIO AL CLIENTE",
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 18v-6a9 9 0 0 1 18 0v6"></path><path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"></path></svg>`,
        description: "Tendrás la mejor atencion en todo momento.",
      },
      {
        title: "PAGOS SEGUROS",
        svgIcon: `<svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>`,
        description: "Puedes realizar tu pago por nuestros metodos con seguridad.",
      },
    ];

    getProductCategories(): Observable<any[]> {
      return of(this.productCategories);
    }
  
    getFeatures(): Observable<any[]> {
      return of(this.features);
    }
  

}
