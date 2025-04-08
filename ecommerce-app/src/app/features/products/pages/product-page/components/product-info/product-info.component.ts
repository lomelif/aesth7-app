import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'product-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-info.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductInfoComponent { 

  @Input()
  description: string = "";

  @Input()
  details: string[] =[];

  isDescriptionOpen = false
  isShippingOpen = false

  toggleDescription(): void {
    this.isDescriptionOpen = !this.isDescriptionOpen
  }

  toggleShipping(): void {
    this.isShippingOpen = !this.isShippingOpen
  }
}
