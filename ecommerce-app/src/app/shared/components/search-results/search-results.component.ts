import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShowProduct } from '../../../models/products.interface';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./search-results.component.html",
  styles: []
})
export class SearchResultsComponent {
  @Input() searchResults: ShowProduct[] = [];
  @Input() searchQuery: string = '';
  @Input() showSearchResults: boolean = false;
}