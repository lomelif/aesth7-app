import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-best-sellers',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './best-sellers.component.html'
})
export class BestSellersComponent {

  featuredProducts = [
    { name: "T-Shirt Dream+", price: "499 MXN", discount: "799 MXN" },
    { name: "T-Shirt Utopia", price: "459 MXN" },
    { name: "T-Shirt Still Alone", price: "659 MXN", discount: "899 MXN" },
    { name: "T-Shirt Moonlight", price: "799 MXN" },
  ]

}
