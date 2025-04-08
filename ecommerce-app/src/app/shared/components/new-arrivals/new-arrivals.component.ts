import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShowProduct } from '../../../models/products.interface';

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './new-arrivals.component.html'
})
export class NewArrivalsComponent {

  @Input()
  public newArrivals: ShowProduct[] = [];

}
