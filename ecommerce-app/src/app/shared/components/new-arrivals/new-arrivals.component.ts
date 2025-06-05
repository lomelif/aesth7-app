import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShowProduct } from '../../../models/products.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-new-arrivals',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './new-arrivals.component.html',
  styleUrl: './new-arrivals.component.css'
})
export class NewArrivalsComponent {

  @Input()
  public newArrivals: ShowProduct[] = [];

  @Input()
  public loading: boolean = true;

}
