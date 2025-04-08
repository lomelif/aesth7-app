import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [],
  templateUrl: './catalog-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CatalogComponent { }
