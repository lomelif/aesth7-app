import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html'
})
export class CategoriesComponent {

  categories = ["Mujer", "Hombre", "Accesorios", "Calzado"]


}
