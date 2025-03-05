import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-checkout-page',
  standalone: true,
  imports: [],
  templateUrl: './checkout-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CheckoutPageComponent { 
  
//   Página de Checkout (Pago)
// Formulario para datos de envío.
// Selección de método de pago (tarjeta, PayPal, etc.).
// Resumen de compra antes de confirmar.
// Botón de "Finalizar compra".
}
