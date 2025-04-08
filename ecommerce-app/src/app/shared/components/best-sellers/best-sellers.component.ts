import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShowProduct } from '../../../models/products.interface';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-sellers.component.html'
})
export class BestSellersComponent {

  @Input()
  public bestSellers: ShowProduct[] = [];

}
