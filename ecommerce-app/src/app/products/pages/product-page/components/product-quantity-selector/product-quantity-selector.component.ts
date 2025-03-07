import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'product-quantity-selector',
  standalone: true,
  imports: [],
  templateUrl: './product-quantity-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductQuantitySelectorComponent { 

  @Input() quantity: number = 1;
  @Output() increase = new EventEmitter<void>();
  @Output() decrease = new EventEmitter<void>();

  onDecrease(): void {
    if (this.quantity > 1) {
      this.decrease.emit();
    }
  }

  onIncrease(): void {
    this.increase.emit();
  }
}
