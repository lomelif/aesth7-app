import { Injectable } from "@angular/core"
import { BehaviorSubject, catchError, of, tap, type Observable } from "rxjs"
import { User, Order, Address } from './../models/user.interface';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: "root",
})
export class UserService {
  constructor(private http: HttpClient) {}

  private ordersSubject = new BehaviorSubject<Order[]>([])

  private addressesSubject = new BehaviorSubject<Address[]>([
    {
      id: "1",
      label: "Casa",
      name: "María González",
      street: "Av. Reforma 123, Col. Centro",
      city: "Ciudad de México, CDMX 06000",
      country: "México",
      phone: "+52 55 1234 5678",
      isPrimary: true,
    },
    {
      id: "2",
      label: "Oficina",
      name: "María González",
      street: "Torre Corporativa, Piso 15",
      city: "Polanco, CDMX 11560",
      country: "México",
      phone: "+52 55 1234 5678",
      isPrimary: false,
    },
  ])

  getUser(): Observable<User> {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<User>(`${environment.apiUrl}/api/User/${userId}`, { headers });
  }

  getOrders(): Observable<Order[]> {
    return this.ordersSubject.asObservable()
  }

  getAddresses(): Observable<Address[]> {
    return this.addressesSubject.asObservable()
  }

  fetchOrdersByEmail(email: string): Observable<Order[]> {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    const params = new HttpParams().set('email', email);

    return this.http.get<Order[]>(`${environment.apiUrl}/api/Order/ByEmail`, { headers, params })
      .pipe(
        tap(orders => this.ordersSubject.next(orders)),
        catchError(err => {
          if (err.status === 404) {
            this.ordersSubject.next([]);
            return of([]);
          }
          return of([]);
        })
      );
  }

//   updateUser(user: User): void {
//     this.userSubject.next(user)
//   }
}
