import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ProductPageComponent } from './products/pages/product-page/product-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'product', component: ProductPageComponent },
    { path: '**', redirectTo: '' }
];
