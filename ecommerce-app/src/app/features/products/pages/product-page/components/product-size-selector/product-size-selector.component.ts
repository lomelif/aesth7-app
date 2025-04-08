import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { Size } from '../../../../../../models/product.interface';

@Component({
  selector: 'product-size-selector',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-size-selector.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductSizeSelectorComponent { 

  @Input()
  sizes: Size[] = [];

  @Output() 
  sizeSelected = new EventEmitter<Size>()

  selectSize(size: Size): void {
    this.sizeSelected.emit(size)
  }

  getSelectedSize(): string {
    const selectedSize = this.sizes.find((s: Size) => s.selected);
    return selectedSize ? selectedSize.name : "";
  }
}
