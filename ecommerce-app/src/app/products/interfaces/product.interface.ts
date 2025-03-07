export interface Product {
    id: string
    name: string
    price: number
    description: string
    sizes: Size[]
    images: string[]
    details: string[]
    promotions: string[]
  }
  
  export interface Size {
    name: string
    available: boolean
    selected?: boolean
  }