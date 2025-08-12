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
    price: number
    quantity: number
  }
  
  export interface Order {
    id: string
    date: string
    status: "Entregado" | "En tránsito" | "Procesando"
    total: number
    totalItems: number
    items: Product[]
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
  