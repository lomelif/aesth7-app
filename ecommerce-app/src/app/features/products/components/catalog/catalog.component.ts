import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { CatalogProduct } from '../../../../models/product.interface';
import { ProductsService } from '../../../../services/products.service';
import { FormsModule } from '@angular/forms';

interface FilterOption {
  title: string;
  expanded: boolean;
  options?: string[];
}

@Component({
  selector: 'product-catalog',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent implements OnInit {
  @Input() title: string = '';
  @Input() sortBy: string = 'views';
  @Input() type: string = '';

  products: CatalogProduct[] = [];
  paginationInfo: any = {
    totalPages: 0,
    totalElements: 0,
    currentPage: 0,
    first: true,
    last: true,
    pageSize: 8
  };
  loading = true;
  activeFilters: { color?: string, type?: string } = {};
  selectedOptions: { [key: string]: string } = {};
  isFilterOpen = false;
  filterOptions: FilterOption[] = [
    {
      title: "Ordenar",
      expanded: false,
      options: ["Más reciente", "Precio: menor a mayor", "Precio: mayor a menor", "Alfabético: A-Z", "Alfabético: Z-A"],
    },
    {
      title: "Color",
      expanded: false,
      options: ["Black", "White"],
    },
  ];

  constructor(private cdr: ChangeDetectorRef, private productsService: ProductsService) {}

  ngOnInit(): void {
    if (this.type) {
      this.activeFilters.type = this.type;
    }
    this.loadCatalogProducts();
  }

  loadCatalogProducts(page: number = 0): void {
    this.loading = true;
    this.cdr.markForCheck();

    this.productsService.getCatalogProducts(page, this.paginationInfo.pageSize, this.sortBy, this.activeFilters).subscribe({
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
      error: () => {
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
    const color = this.selectedOptions['Color'];
    const order = this.selectedOptions['Ordenar'];

    this.activeFilters = {
      color: color
    };

    this.sortBy = this.getSortKey(order);
    this.toggleFilter();
    this.loadCatalogProducts(0);
    this.cdr.markForCheck();
  }

  getSortKey(label: string): string {
    switch (label) {
      case 'Precio: menor a mayor': return 'price_asc';
      case 'Precio: mayor a menor': return 'price_desc';
      case 'Alfabético: A-Z': return 'name_asc';
      case 'Alfabético: Z-A': return 'name_desc';
      case 'Más reciente':
      default: return 'views';
    }
  }
}
