export interface Product {
    id: string
    name: string
    price: number
    description: string
    colors: Color[]
    sizes: Size[]
    images: string[]
    details: string[]
    promotions: string[]
  }
  
  export interface Color {
    name: string
    value: string
    selected?: boolean
  }
  
  export interface Size {
    name: string
    available: boolean
    selected?: boolean
  }