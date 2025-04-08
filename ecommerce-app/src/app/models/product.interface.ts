export interface Product {
    id: string
    name: string
    type: string
    price: number
    color: string
    description: string
    sizes: Size[]
    images: string[]
    details: string[]
    release: Date
    availability: boolean
  }
  
  export interface Size {
    name: string
    available: boolean
    selected?: boolean
  }