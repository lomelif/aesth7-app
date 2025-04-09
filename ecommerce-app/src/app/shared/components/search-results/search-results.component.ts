import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: "./search-results.component.html",
  styles: []
})
export class SearchResultsComponent {
  @Input() results: any[] = [];
  @Input() query: string = '';
  @Input() show: boolean = false;
}