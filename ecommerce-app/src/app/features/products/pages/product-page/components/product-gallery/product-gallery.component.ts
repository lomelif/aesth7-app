import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'product-gallery',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-gallery.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductGalleryComponent { 
  @Input() 
  images: string[] = []
  
  @Input() 
  selectedImage: string = ""
  
  @Output() 
  imageSelected = new EventEmitter<string>()

  selectImage(image: string): void {
    this.imageSelected.emit(image);
  }
}
