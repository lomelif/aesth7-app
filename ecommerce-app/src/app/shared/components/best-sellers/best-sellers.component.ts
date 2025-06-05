import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ShowProduct } from '../../../models/products.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './best-sellers.component.html',
  styleUrl: './best-sellers.component.css'
})
export class BestSellersComponent {

  @Input()
  public bestSellers: ShowProduct[] = [];

  @Input()
  public loading: boolean = true;

}
