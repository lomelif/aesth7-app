import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-terms-page',
  standalone: true,
  imports: [],
  templateUrl: './terms-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TermsPageComponent { }
