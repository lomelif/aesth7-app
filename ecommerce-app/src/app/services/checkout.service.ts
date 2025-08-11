// src/app/services/checkout.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { loadStripe, Stripe } from '@stripe/stripe-js';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {
  private stripePromise = loadStripe('pk_test');

  constructor(private http: HttpClient) {}

  async redirectToCheckout(items: any[]): Promise<void> {
    try {
        const session = await firstValueFrom(
            this.http.post<any>(`${environment.apiUrl}/api/Checkout`, items)
          );

        const stripe = await this.stripePromise;
        if (stripe) {
            await stripe.redirectToCheckout({ sessionId: session.id });
        } else {
        }
    } catch (error) {
    }
  }
}
