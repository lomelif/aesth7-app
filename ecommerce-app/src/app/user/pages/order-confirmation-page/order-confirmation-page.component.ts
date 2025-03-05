import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-order-confirmation-page',
  standalone: true,
  imports: [],
  templateUrl: './order-confirmation-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderConfirmationPageComponent { }
