export interface User {
    name: string
    lastName: string
    email: string
    avatar?: string
    totalOrders?: number
    totalSpent?: string
  }
  
  export interface Product {
    name: string
    image: string
  }
  
  export interface Order {
    id: string
    date: string
    status: "Entregado" | "En tránsito" | "Procesando"
    total: string
    items: number
    products: Product[]
  }
  
  export interface Address {
    id: string
    label: string
    name: string
    street: string
    city: string
    country: string
    phone: string
    isPrimary: boolean
  }
  