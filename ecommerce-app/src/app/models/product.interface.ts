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

export interface CatalogProduct{
    id: number
    name: string
    type: string
    price: number
    color: string
    release: Date
    views: number
    images: string
}

export interface Pageable {
    pageNumber: number;
    pageSize: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    offset: number;
    paged: boolean;
    unpaged: boolean;
  }
  
  export interface PaginatedResponse<T> {
    content: T[];
    pageable: Pageable;
    totalPages: number;
    totalElements: number;
    last: boolean;
    numberOfElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
      sorted: boolean;
      unsorted: boolean;
      empty: boolean;
    };
    empty: boolean;
  }