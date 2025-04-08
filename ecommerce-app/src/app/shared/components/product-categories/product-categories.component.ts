import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ProductCategories } from '../../../models/info.interface';

@Component({
  selector: 'app-product-categories',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './product-categories.component.html'
})
export class ProductCategoriesComponent {
  
  @Input()
  public productCategories: ProductCategories[] = [];
}
