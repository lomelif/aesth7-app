import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/home-page/home-page.component';
import { ProductPageComponent } from './features/products/pages/product-page/product-page.component';
import { LoginPageComponent } from './features/auth/pages/login-page/login-page.component';
import { RegisterPageComponent } from './features/auth/pages/register-page/register-page.component';
import { NewArrivalsPageComponent } from './features/products/pages/new-arrivals-page/new-arrivals-page.component';

export const routes: Routes = [
    { path: '', component: HomePageComponent },
    { path: 'product', component: ProductPageComponent },
    { path: 'new-arrivals', component: NewArrivalsPageComponent },
    { path: 'login', component: LoginPageComponent },
    { path: 'register', component: RegisterPageComponent },
    { path: '**', redirectTo: '' }
];
