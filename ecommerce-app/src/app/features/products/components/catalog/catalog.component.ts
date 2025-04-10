import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CatalogProduct } from '../../../../models/product.interface';
import { ProductsService } from '../../../../services/products.service';

interface FilterOption {
  title: string
  expanded: boolean
  options?: string[]
}

@Component({
  selector: 'product-catalog',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NewArrivalsComponent implements OnInit {
  @Input() title = '';
  @Input() sortBy = 'views'

  products: CatalogProduct[] = []
  paginationInfo: any = {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    first: true,
    last: true,
    pageSize: 8
  };
  loading = true;
  isFilterOpen = false;
  filterOptions: FilterOption[] = [
    {
      title: "Ordenar",
      expanded: false,
      options: ["Más reciente", "Precio: menor a mayor", "Precio: mayor a menor", "Alfabético: A-Z", "Alfabético: Z-A"],
    },
    {
      title: "Precio (MXN)",
      expanded: false,
      options: ["$0 - $500", "$500 - $1000", "$1000 - $1500", "$1500+"],
    },
    {
      title: "Color",
      expanded: false,
      options: ["Negro", "Blanco"],
    },
  ];

  constructor(private cdr: ChangeDetectorRef, private productsService: ProductsService) {}

  ngOnInit(): void {
    this.loadCatalogProducts();
  }

  loadCatalogProducts(page: number = 0): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.productsService.getCatalogProducts(page, this.paginationInfo.pageSize, this.sortBy).subscribe({
      next: (response) => {
        this.products = [...response.content];
        this.paginationInfo = {
          totalPages: response.totalPages,
          totalElements: response.totalElements,
          currentPage: response.number,
          first: response.first,
          last: response.last,
          pageSize: response.size
        };
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.loading = false;
        this.cdr.markForCheck();
      }
    });
  }

  onPageChange(page: number): void {
    if (page < 0 || page >= this.paginationInfo.totalPages) return;
    this.loadCatalogProducts(page);
  }

  toggleFilter(): void {
    this.isFilterOpen = !this.isFilterOpen;
    if (this.isFilterOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    this.cdr.markForCheck();
  }

  toggleFilterOption(option: FilterOption): void {
    option.expanded = !option.expanded;
    this.cdr.markForCheck();
  }

  applyFilters(): void {
    this.toggleFilter();
    this.loadCatalogProducts(0);
  }
}