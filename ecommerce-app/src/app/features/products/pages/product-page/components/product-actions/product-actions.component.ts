import { ChangeDetectionStrategy, Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'product-actions',
  standalone: true,
  imports: [],
  templateUrl: './product-actions.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductActionsComponent { 

  @Output() addToCart = new EventEmitter<void>();
  @Output() buyNow = new EventEmitter<void>();

  onAddToCart(): void {
    this.addToCart.emit();
  }

  onBuyNow(): void {
    this.buyNow.emit();
  }
}
