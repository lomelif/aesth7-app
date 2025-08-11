import { Injectable } from "@angular/core"
import { BehaviorSubject, type Observable } from "rxjs"
import { User, Order, Address } from './../models/user.interface';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "../../environments/environment";


@Injectable({
  providedIn: "root",
})
export class UserService {
    constructor(private http: HttpClient) {}

  // private ordersSubject = new BehaviorSubject<Order[]>([
  //   {
  //     id: "#ORD-001",
  //     date: "15 Dic 2024",
  //     status: "Entregado",
  //     total: "$89.99",
  //     items: 3,
  //     products: [
  //       { name: "Camiseta Básica", image: "/placeholder.svg?height=60&width=60" },
  //       { name: "Jeans Slim Fit", image: "/placeholder.svg?height=60&width=60" },
  //       { name: "Zapatillas Deportivas", image: "/placeholder.svg?height=60&width=60" },
  //     ],
  //   },
  //   {
  //     id: "#ORD-002",
  //     date: "8 Dic 2024",
  //     status: "En tránsito",
  //     total: "$156.50",
  //     items: 2,
  //     products: [
  //       { name: "Chaqueta de Invierno", image: "/placeholder.svg?height=60&width=60" },
  //       { name: "Bufanda de Lana", image: "/placeholder.svg?height=60&width=60" },
  //     ],
  //   },
  //   {
  //     id: "#ORD-003",
  //     date: "1 Dic 2024",
  //     status: "Procesando",
  //     total: "$45.00",
  //     items: 1,
  //     products: [{ name: "Gorra Deportiva", image: "/placeholder.svg?height=60&width=60" }],
  //   },
  //   {
  //     id: "#ORD-004",
  //     date: "25 Nov 2024",
  //     status: "Entregado",
  //     total: "$234.99",
  //     items: 4,
  //     products: [
  //       { name: "Vestido Elegante", image: "/placeholder.svg?height=60&width=60" },
  //       { name: "Tacones Negros", image: "/placeholder.svg?height=60&width=60" },
  //       { name: "Bolso de Mano", image: "/placeholder.svg?height=60&width=60" },
  //       { name: "Collar de Perlas", image: "/placeholder.svg?height=60&width=60" },
  //     ],
  //   },
  // ])
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

//   updateUser(user: User): void {
//     this.userSubject.next(user)
//   }
}
